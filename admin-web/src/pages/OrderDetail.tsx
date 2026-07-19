import { Button, Descriptions, Drawer, Space, Table, Tag, App, Popconfirm } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ColumnsType } from 'antd/es/table';
import { fetchOrderDetail, updateOrderStatus } from '../api/order';
import type { OrderItem, OrderStatus } from '../types/api';
import { formatDateTime, formatMoney } from '../utils/format';

// 订单状态映射（与 OrderList 保持一致）
const STATUS_META: Record<OrderStatus, { label: string; color: string }> = {
  pending_payment: { label: '待付款', color: 'warning' },
  paid: { label: '已付款', color: 'processing' },
  shipped: { label: '已发货', color: 'blue' },
  completed: { label: '已完成', color: 'success' },
  cancelled: { label: '已取消', color: 'default' },
};

// 订单状态流转按钮
function getNextActions(status: OrderStatus): { label: string; next: OrderStatus; danger?: boolean }[] {
  switch (status) {
    case 'pending_payment':
      return [{ label: '标记已付款', next: 'paid' }];
    case 'paid':
      return [{ label: '发货', next: 'shipped' }];
    case 'shipped':
      return [{ label: '完成订单', next: 'completed' }];
    default:
      return [];
  }
}

export default function OrderDetail({
  orderId,
  onClose,
  onUpdated,
}: {
  orderId: number | null;
  onClose: () => void;
  onUpdated?: () => void;
}) {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', 'detail', orderId],
    queryFn: () => fetchOrderDetail(orderId!),
    enabled: orderId !== null,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      message.success('状态已更新');
      queryClient.invalidateQueries({ queryKey: ['order', 'detail', orderId] });
      queryClient.invalidateQueries({ queryKey: ['order', 'page'] });
      onUpdated?.();
    },
  });

  const itemColumns: ColumnsType<OrderItem> = [
    {
      title: '商品',
      dataIndex: 'productName',
      render: (name: string, record) => (
        <Space>
          {record.imageUrl && (
            <img
              src={record.imageUrl}
              alt=""
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                objectFit: 'cover',
              }}
            />
          )}
          <span>{name}</span>
        </Space>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      width: 100,
      align: 'right',
      render: (v: number) => formatMoney(v),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      width: 80,
      align: 'right',
    },
    {
      title: '小计',
      dataIndex: 'subtotal',
      width: 110,
      align: 'right',
      render: (v: number) => formatMoney(v),
    },
  ];

  const nextActions = order ? getNextActions(order.status) : [];

  return (
    <Drawer
      title="订单详情"
      width={640}
      open={orderId !== null}
      onClose={onClose}
      destroyOnClose
      extra={
        order && nextActions.length > 0 ? (
          <Space>
            {order.status !== 'cancelled' &&
              order.status !== 'completed' && (
                <Popconfirm
                  title="确认取消该订单？"
                  onConfirm={() =>
                    statusMutation.mutate({
                      id: order.id,
                      status: 'cancelled' as OrderStatus,
                    })
                  }
                  okText="确认"
                  cancelText="取消"
                  okButtonProps={{ danger: true }}
                >
                  <Button danger>取消订单</Button>
                </Popconfirm>
              )}
            {nextActions.map((a) => (
              <Button
                key={a.next}
                type="primary"
                loading={statusMutation.isPending}
                onClick={() =>
                  statusMutation.mutate({ id: order.id, status: a.next })
                }
              >
                {a.label}
              </Button>
            ))}
          </Space>
        ) : null
      }
    >
      {isLoading || !order ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
          加载中…
        </div>
      ) : (
        <>
          <Descriptions
            column={2}
            bordered
            size="small"
            labelStyle={{ width: 90, background: '#fafafa' }}
          >
            <Descriptions.Item label="订单号" span={2}>
              {order.orderNo}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={STATUS_META[order.status].color}>
                {STATUS_META[order.status].label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="下单时间">
              {formatDateTime(order.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="客户">
              {order.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="联系电话">
              {order.customerPhone || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="收货地址" span={2}>
              {order.address || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>
              {order.remark || '-'}
            </Descriptions.Item>
          </Descriptions>

          <h4 style={{ marginTop: 20, marginBottom: 12 }}>订单明细</h4>
          <Table<OrderItem>
            rowKey="id"
            size="small"
            columns={itemColumns}
            dataSource={order.items || []}
            pagination={false}
          />

          <div
            style={{
              marginTop: 16,
              textAlign: 'right',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            合计：<span style={{ color: '#c25e2c' }}>{formatMoney(order.totalAmount)}</span>
          </div>
        </>
      )}
    </Drawer>
  );
}
