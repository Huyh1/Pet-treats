import { useMemo, useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Space, theme as antdTheme } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import ChangePasswordModal from '../components/ChangePasswordModal';

const { Header, Sider, Content } = Layout;

// 侧边菜单配置
const menuItems = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '仪表盘' },
  { key: '/product', icon: <ShoppingOutlined />, label: '商品管理' },
  { key: '/category', icon: <AppstoreOutlined />, label: '分类管理' },
  { key: '/order', icon: <ProfileOutlined />, label: '订单管理' },
  { key: '/review', icon: <CommentOutlined />, label: '评价审核' },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, clear } = useAuthStore();
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = antdTheme.useToken();

  // 当前选中菜单：取路径前两段以匹配 /product/edit/:id 等子路径
  const selectedKey = useMemo(() => {
    const seg = location.pathname.split('/').filter(Boolean)[0];
    return `/${seg || 'dashboard'}`;
  }, [location.pathname]);

  // 退出登录
  const handleLogout = () => {
    clear();
    navigate('/login', { replace: true });
  };

  // 用户下拉菜单
  const userMenu = {
    items: [
      {
        key: 'password',
        icon: <KeyOutlined />,
        label: '修改密码',
        onClick: () => setPwdOpen(true),
      },
      { type: 'divider' as const },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '退出登录',
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        style={{
          background: colorBgContainer,
          boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 18px',
            overflow: 'hidden',
            borderBottom: `1px solid ${colorBorderSecondary}`,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #d97742 0%, #9f4a22 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            茸
          </div>
          {!collapsed && (
            <div style={{ lineHeight: 1.2, overflow: 'hidden' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1f1f1f' }}>
                毛茸手作
              </div>
              <div style={{ fontSize: 11, color: '#8c8c8c' }}>
                宠物零食 · 管理后台
              </div>
            </div>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${colorBorderSecondary}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <Space size={12}>
            <span
              style={{ fontSize: 18, cursor: 'pointer', color: '#595959' }}
              onClick={() => setCollapsed((c) => !c)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </Space>
          <Dropdown menu={userMenu} placement="bottomRight">
            <Space style={{ cursor: 'pointer', padding: '0 8px' }}>
              <Avatar
                size={32}
                style={{ background: '#c25e2c' }}
                icon={<UserOutlined />}
              />
              <span style={{ fontWeight: 500 }}>
                {admin?.nickname || admin?.username || '管理员'}
              </span>
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: 16,
            padding: 20,
            background: colorBgContainer,
            borderRadius: 12,
            minHeight: 280,
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <ChangePasswordModal open={pwdOpen} onClose={() => setPwdOpen(false)} />
    </Layout>
  );
}
