import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Space,
  Table,
  Tabs,
  Tag,
  App,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import type { ColumnsType } from 'antd/es/table';
import { fetchOrderPage } from '../api/order';
import type { Order, OrderPageQuery, OrderStatus } from '../types/api';
import { formatDateTime, formatMoney } from '../utils/format';
import OrderDetail from './OrderDetail';

// 订单状态映射
const STATUS_META: Record<
  OrderStatus | 'all',
  { label: string; color: string }
> = {
  all: { label: '全部', color: 'default' },
  pending_payment: { label: '待付款', color: 'warning' },
  paid: { label: '已付款', color: 'processing' },
  shipped: { label: '已发货', color: 'blue' },
  completed: { label: '已完成', color: 'success' },
  cancelled: { label: '已取消', color: 'default' },
};

export default function OrderList() {
  const { message } = App.useApp();
  const [activeStatus, setActiveStatus] = useState<OrderStatus | 'all'>('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [drawerId, setDrawerId] = useState<number | null>(null);

  const query: OrderPageQuery = useMemo(
    () => ({
      page: pagination.current,
      size: pagination.pageSize,
      status: activeStatus === 'all' ? undefined : activeStatus,
    }),
    [pagination, activeStatus],
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['order', 'page', query],
    queryFn: () => fetchOrderPage(query),
  });

  const columns: ColumnsType<Order> = [
    { title: '订单号', dataIndex: 'orderNo', width: 200 },
    {
      title: '客户',
      dataIndex: 'customerName',
      width: 140,
      render: (v?: string) => v || '-',
    },
    {
      title: '金额',
      dataIndex: 'totalAmount',
      width: 120,
      align: 'right',
      render: (v: number) => formatMoney(v),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (s: OrderStatus) => (
        <Tag color={STATUS_META[s].color}>{STATUS_META[s].label}</Tag>
      ),
    },
    {
      title: '下单时间',
      dataIndex: 'createdAt',
      width: 180,
      render: (v: string) => formatDateTime(v),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => setDrawerId(record.id)}
        >
          查看
        </Button>
      ),
    },
  ];

  // tabs 配置
  const tabItems = (Object.keys(STATUS_META) as (OrderStatus | 'all')[]).map(
    (key) => ({
      key,
      label: STATUS_META[key].label,
    }),
  );

  // 切换 tab
  const handleTabChange = (key: string) => {
    setActiveStatus(key as OrderStatus | 'all');
    setPagination((p) => ({ ...p, current: 1 }));
  };

  // 刷新
  const handleRefresh = () => {
    setPagination((p) => ({ ...p }));
    message.info('已刷新');
  };

  return (
    <div>
      <Card
        style={{ borderRadius: 12, border: 'none' }}
        styles={{ body: { padding: 0 } }}
      >
        <Tabs
          items={tabItems}
          activeKey={activeStatus}
          onChange={handleTabChange}
          style={{ padding: '0 16px' }}
        />
        <Table<Order>
          rowKey="id"
          columns={columns}
          dataSource={data?.records || []}
          loading={isLoading || isFetching}
          scroll={{ x: 800 }}
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

      <Space style={{ marginTop: 12 }}>
        <Button onClick={handleRefresh}>刷新列表</Button>
      </Space>

      <OrderDetail
        orderId={drawerId}
        onClose={() => setDrawerId(null)}
        onUpdated={() => {
          // 状态变更后刷新列表数据由 OrderDetail 内部触发 invalidate
        }}
      />
    </div>
  );
}
