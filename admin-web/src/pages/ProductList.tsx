import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  App,
} from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import {
  deleteProduct,
  fetchProductPage,
  updateProductStatus,
} from '../api/product';
import { fetchCategoryList } from '../api/category';
import type { Category, Product, ProductPageQuery } from '../types/api';
import { formatMoney } from '../utils/format';

// 商品状态标签
function StatusTag({ status }: { status: number }) {
  return status === 1 ? (
    <Tag color="success">上架</Tag>
  ) : (
    <Tag color="default">下架</Tag>
  );
}

export default function ProductList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const [query, setQuery] = useState<ProductPageQuery>({
    page: 1,
    size: 10,
    keyword: '',
    categoryId: undefined,
    series: '',
    status: undefined,
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // 分类列表用于筛选
  const categoryQuery = useQuery({
    queryKey: ['category', 'list'],
    queryFn: fetchCategoryList,
    staleTime: 5 * 60 * 1000,
  });

  const categoryMap = useMemo(() => {
    const map = new Map<number, Category>();
    (categoryQuery.data || []).forEach((c) => map.set(c.id, c));
    return map;
  }, [categoryQuery.data]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['product', 'page', query],
    queryFn: () => fetchProductPage(query),
  });

  // 上下架
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) =>
      updateProductStatus(id, status),
    onSuccess: () => {
      message.success('操作成功');
      queryClient.invalidateQueries({ queryKey: ['product', 'page'] });
    },
  });

  // 删除
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      message.success('删除成功');
      queryClient.invalidateQueries({ queryKey: ['product', 'page'] });
    },
  });

  // 提交搜索
  const handleSearch = () => {
    const values = form.getFieldsValue();
    setQuery({
      page: 1,
      size: pagination.pageSize,
      keyword: values.keyword?.trim() || '',
      categoryId: values.categoryId,
      series: values.series?.trim() || '',
      status: values.status,
    });
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const handleReset = () => {
    form.resetFields();
    setQuery({ page: 1, size: pagination.pageSize });
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const columns: ColumnsType<Product> = [
    {
      title: '图片',
      dataIndex: 'imageUrl',
      width: 70,
      render: (url?: string) =>
        url ? (
          <Image
            src={url}
            width={48}
            height={48}
            style={{ borderRadius: 8, objectFit: 'cover' }}
            fallback="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjZjVmNWRmIi8+PC9zdmc+"
          />
        ) : (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#bfbfbf',
              fontSize: 11,
            }}
          >
            无图
          </div>
        ),
    },
    { title: '名称', dataIndex: 'name', ellipsis: true, minWidth: 180 },
    {
      title: '分类',
      dataIndex: 'categoryId',
      width: 110,
      render: (cid?: number) =>
        cid ? categoryMap.get(cid)?.name || '-' : '-',
    },
    { title: '系列', dataIndex: 'series', width: 110, render: (v) => v || '-' },
    {
      title: '价格',
      dataIndex: 'price',
      width: 100,
      align: 'right',
      render: (v: number) => formatMoney(v),
    },
    {
      title: '月销',
      dataIndex: 'monthlySales',
      width: 80,
      align: 'right',
      render: (v?: number) => v ?? 0,
    },
    {
      title: '评分',
      dataIndex: 'rating',
      width: 80,
      align: 'right',
      render: (v?: number) => (v ? v.toFixed(1) : '-'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      render: (status: number) => <StatusTag status={status} />,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            onClick={() => navigate(`/product/edit/${record.id}`)}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() =>
              statusMutation.mutate({
                id: record.id,
                status: record.status === 1 ? 0 : 1,
              })
            }
          >
            {record.status === 1 ? '下架' : '上架'}
          </Button>
          <Popconfirm
            title="确认删除该商品？"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        style={{ marginBottom: 16, borderRadius: 12, border: 'none' }}
        styles={{ body: { padding: 16 } }}
      >
        <Form form={form} layout="inline" onFinish={handleSearch}>
          <Form.Item name="keyword" label="关键字">
            <Input placeholder="商品名称" allowClear style={{ width: 160 }} />
          </Form.Item>
          <Form.Item name="categoryId" label="分类">
            <Select
              placeholder="全部"
              allowClear
              style={{ width: 140 }}
              options={(categoryQuery.data || []).map((c) => ({
                label: c.name,
                value: c.id,
              }))}
            />
          </Form.Item>
          <Form.Item name="series" label="系列">
            <Input placeholder="系列" allowClear style={{ width: 120 }} />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select
              placeholder="全部"
              allowClear
              style={{ width: 110 }}
              options={[
                { label: '上架', value: 1 },
                { label: '下架', value: 0 },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card
        style={{ borderRadius: 12, border: 'none' }}
        styles={{ body: { padding: 0 } }}
        title={
          <Space>
            <span>商品列表</span>
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={() => queryClient.invalidateQueries({ queryKey: ['product', 'page'] })}
            >
              刷新
            </Button>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/product/new')}
          >
            新增商品
          </Button>
        }
      >
        <Table<Product>
          rowKey="id"
          columns={columns}
          dataSource={data?.records || []}
          loading={isLoading || isFetching}
          scroll={{ x: 1100 }}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: data?.total || 0,
            showSizeChanger: true,
            showTotal: (t) => `共 ${t} 条`,
            onChange: (current, pageSize) => {
              setPagination({ current, pageSize });
              setQuery((q) => ({ ...q, page: current, size: pageSize }));
            },
          }}
        />
      </Card>
    </div>
  );
}
