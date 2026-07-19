import { useQuery } from '@tanstack/react-query';
import {
  Card,
  Col,
  Row,
  Skeleton,
  Table,
  Empty,
  Typography,
} from 'antd';
import {
  ShoppingOutlined,
  DollarOutlined,
  InboxOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { ColumnsType } from 'antd/es/table';
import {
  fetchDashboardSummary,
  fetchSalesTrend,
  fetchTopProducts,
} from '../api/dashboard';
import type {
  DashboardSummary,
  SalesTrendItem,
  TopProductItem,
} from '../types/api';
import { formatMoney, formatAxisMoney } from '../utils/format';

const { Title, Text } = Typography;

// 统计卡片配置
function buildStatCards(summary: DashboardSummary | undefined) {
  const cards = [
    {
      title: '今日订单',
      value: summary?.todayOrders ?? 0,
      icon: <ShoppingOutlined />,
      color: '#c25e2c',
      bg: 'linear-gradient(135deg, #fdf6ee 0%, #f9e7d1 100%)',
    },
    {
      title: '今日销售额',
      value: formatMoney(summary?.todaySales ?? 0),
      icon: <DollarOutlined />,
      color: '#389e0d',
      bg: 'linear-gradient(135deg, #f0f9eb 0%, #d9f0c2 100%)',
    },
    {
      title: '商品总数',
      value: summary?.productCount ?? 0,
      icon: <InboxOutlined />,
      color: '#1677ff',
      bg: 'linear-gradient(135deg, #e6f4ff 0%, #bae0ff 100%)',
    },
    {
      title: '待审评价',
      value: summary?.pendingReviews ?? 0,
      icon: <CommentOutlined />,
      color: '#722ed1',
      bg: 'linear-gradient(135deg, #f4f0ff 0%, #d6c8ff 100%)',
    },
  ];
  return cards;
}

export default function Dashboard() {
  const summaryQuery = useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: fetchDashboardSummary,
  });
  const trendQuery = useQuery({
    queryKey: ['dashboard', 'sales-trend'],
    queryFn: () => fetchSalesTrend(7),
  });
  const topQuery = useQuery({
    queryKey: ['dashboard', 'top-products'],
    queryFn: () => fetchTopProducts(5),
  });

  const cards = buildStatCards(summaryQuery.data);

  const topColumns: ColumnsType<TopProductItem> = [
    {
      title: '排名',
      width: 60,
      align: 'center',
      render: (_, __, index) => {
        const colors = ['#c25e2c', '#d97742', '#e8915a', '#bfbfbf', '#bfbfbf'];
        return (
          <span
            style={{
              display: 'inline-flex',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: colors[index] || '#bfbfbf',
              color: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {index + 1}
          </span>
        );
      },
    },
    { title: '商品名称', dataIndex: 'productName', key: 'productName' },
    {
      title: '月销量',
      dataIndex: 'monthlySales',
      key: 'monthlySales',
      width: 100,
      align: 'right',
    },
    {
      title: '累计销售额',
      dataIndex: 'total',
      key: 'total',
      width: 140,
      align: 'right',
      render: (v: number) => formatMoney(v),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>
        仪表盘
      </Title>

      {/* 统计卡 */}
      <Row gutter={[16, 16]}>
        {cards.map((c) => (
          <Col xs={24} sm={12} lg={6} key={c.title}>
            <Card
              style={{ borderRadius: 12, border: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: c.bg,
                    color: c.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                  }}
                >
                  {c.icon}
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {c.title}
                  </Text>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#1f1f1f',
                      lineHeight: 1.3,
                    }}
                  >
                    {summaryQuery.isLoading ? (
                      <Skeleton.Input size="small" active style={{ width: 80 }} />
                    ) : (
                      c.value
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* 销售曲线 */}
        <Col xs={24} lg={16}>
          <Card title="近 7 天销售趋势" style={{ borderRadius: 12, border: 'none' }}>
            {trendQuery.isLoading ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={trendQuery.data || []}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    stroke="#bfbfbf"
                  />
                  <YAxis
                    tickFormatter={(v) => formatAxisMoney(Number(v))}
                    tick={{ fontSize: 12 }}
                    stroke="#bfbfbf"
                  />
                  <Tooltip
                    formatter={(value: number) => [formatMoney(value), '销售额']}
                    labelStyle={{ color: '#1f1f1f' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="销售额"
                    stroke="#c25e2c"
                    strokeWidth={2.5}
                    dot={{ fill: '#c25e2c', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>

        {/* 热销榜 */}
        <Col xs={24} lg={8}>
          <Card title="热销榜 TOP 5" style={{ borderRadius: 12, border: 'none' }}>
            {topQuery.isLoading ? (
              <Skeleton active paragraph={{ rows: 5 }} />
            ) : topQuery.data && topQuery.data.length > 0 ? (
              <Table<TopProductItem>
                size="small"
                rowKey="productId"
                columns={topColumns}
                dataSource={topQuery.data}
                pagination={false}
              />
            ) : (
              <Empty description="暂无数据" />
            )}
          </Card>
        </Col>
      </Row>

      <SalesTrendMini data={trendQuery.data} loading={trendQuery.isLoading} />
    </div>
  );
}

// 销售趋势底部数据条（占位以保持页面密度，避免单卡片空旷）
function SalesTrendMini({
  data,
  loading,
}: {
  data: SalesTrendItem[] | undefined;
  loading: boolean;
}) {
  if (loading || !data || data.length === 0) return null;
  const total = data.reduce((sum, item) => sum + (item.total || 0), 0);
  const avg = total / data.length;
  return (
    <Card
      style={{ marginTop: 16, borderRadius: 12, border: 'none' }}
      styles={{ body: { padding: 16 } }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Text type="secondary">7 天总销售额</Text>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {formatMoney(total)}
          </div>
        </Col>
        <Col span={8}>
          <Text type="secondary">日均销售额</Text>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {formatMoney(avg)}
          </div>
        </Col>
        <Col span={8}>
          <Text type="secondary">最高单日</Text>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {formatMoney(Math.max(...data.map((d) => d.total || 0)))}
          </div>
        </Col>
      </Row>
    </Card>
  );
}
