import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Image,
  Popconfirm,
  Space,
  Table,
  Tabs,
  Tag,
  App,
} from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ColumnsType } from 'antd/es/table';
import {
  deleteReview,
  fetchReviewPage,
  updateReviewStatus,
} from '../api/review';
import type { Review, ReviewPageQuery, ReviewStatus } from '../types/api';
import { formatDateTime } from '../utils/format';

// 评价状态映射（与后端一致：0=待审核 1=已通过 2=已驳回）
const STATUS_META: Record<ReviewStatus | 'all', { label: string; color: string }> = {
  all: { label: '全部', color: 'default' },
  0: { label: '待审核', color: 'warning' },
  1: { label: '已通过', color: 'success' },
  2: { label: '已驳回', color: 'error' },
};

// 评分星级渲染（简单文本星）
function RatingStars({ value }: { value: number }) {
  return (
    <span style={{ color: '#faad14' }}>
      {'★'.repeat(value)}
      <span style={{ color: '#d9d9d9' }}>{'★'.repeat(5 - value)}</span>
    </span>
  );
}

export default function ReviewList() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const [activeStatus, setActiveStatus] = useState<ReviewStatus | 'all'>(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const query: ReviewPageQuery = useMemo(
    () => ({
      page: pagination.current,
      size: pagination.pageSize,
      status: activeStatus === 'all' ? undefined : activeStatus,
    }),
    [pagination, activeStatus],
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['review', 'page', query],
    queryFn: () => fetchReviewPage(query),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: ReviewStatus }) =>
      updateReviewStatus(id, status),
    onSuccess: () => {
      message.success('操作成功');
      queryClient.invalidateQueries({ queryKey: ['review', 'page'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess: () => {
      message.success('删除成功');
      queryClient.invalidateQueries({ queryKey: ['review', 'page'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const columns: ColumnsType<Review> = [
    { title: '商品', dataIndex: 'productName', ellipsis: true, minWidth: 160 },
    {
      title: '宠物',
      dataIndex: 'petType',
      width: 80,
      render: (v?: string) => {
        if (v === 'dog') return '狗';
        if (v === 'cat') return '猫';
        if (v === 'both') return '通用';
        return '-';
      },
    },
    {
      title: '客户',
      dataIndex: 'customerName',
      width: 110,
      render: (v?: string) => v || '-',
    },
    {
      title: '评分',
      dataIndex: 'rating',
      width: 110,
      render: (v: number) => <RatingStars value={v} />,
    },
    {
      title: '内容',
      dataIndex: 'content',
      ellipsis: true,
      minWidth: 220,
    },
    {
      title: '图片',
      dataIndex: 'images',
      width: 80,
      render: (imgs?: string[]) =>
        imgs && imgs.length > 0 ? (
          <Image.PreviewGroup items={imgs}>
            <Image
              src={imgs[0]}
              width={36}
              height={36}
              style={{ borderRadius: 6, objectFit: 'cover' }}
            />
            {imgs.length > 1 && (
              <span style={{ marginLeft: 4, color: '#8c8c8c', fontSize: 12 }}>
                +{imgs.length - 1}
              </span>
            )}
          </Image.PreviewGroup>
        ) : (
          '-'
        ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 90,
      render: (s: ReviewStatus) => (
        <Tag color={STATUS_META[s].color}>{STATUS_META[s].label}</Tag>
      ),
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      width: 160,
      render: (v: string) => formatDateTime(v),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          {record.status !== 1 && (
            <Button
              type="link"
              size="small"
              icon={<CheckOutlined />}
              onClick={() =>
                statusMutation.mutate({ id: record.id, status: 1 })
              }
            >
              通过
            </Button>
          )}
          {record.status !== 2 && (
            <Popconfirm
              title="确认驳回该评价？"
              onConfirm={() =>
                statusMutation.mutate({ id: record.id, status: 2 })
              }
              okText="驳回"
              cancelText="取消"
            >
              <Button type="link" size="small" icon={<CloseOutlined />}>
                驳回
              </Button>
            </Popconfirm>
          )}
          <Popconfirm
            title="确认删除该评价？"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tabItems = (
    Object.keys(STATUS_META) as (ReviewStatus | 'all')[]
  ).map((key) => ({
    key: String(key),
    label: STATUS_META[key].label,
  }));

  return (
    <Card
      style={{ borderRadius: 12, border: 'none' }}
      styles={{ body: { padding: 0 } }}
      title="评价审核"
    >
      <Tabs
        items={tabItems}
        activeKey={String(activeStatus)}
        onChange={(key) => {
          // key 是字符串，'all' / '0' / '1' / '2'
          const next = key === 'all' ? 'all' : (Number(key) as ReviewStatus);
          setActiveStatus(next);
          setPagination((p) => ({ ...p, current: 1 }));
        }}
        style={{ padding: '0 16px' }}
      />
      <Table<Review>
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
          onChange: (current, pageSize) =>
            setPagination({ current, pageSize }),
        }}
      />
    </Card>
  );
}
