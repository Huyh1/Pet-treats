import { useEffect } from 'react';
import { Form, Input, Button, Checkbox, App } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuthStore } from '../store/auth';
import type { LoginResult } from '../types/api';

interface LoginForm {
  username: string;
  password: string;
  remember?: boolean;
}

export default function Login() {
  const [form] = Form.useForm<LoginForm>();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);

  // 已登录则跳转
  const token = useAuthStore((s) => s.token);
  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true });
  }, [token, navigate]);

  const handleSubmit = async (values: LoginForm) => {
    try {
      const data: LoginResult = await login(values.username, values.password);
      if (!data?.token) {
        message.error('登录返回数据异常');
        return;
      }
      setAuth(data.token, data.admin);
      message.success(`欢迎回来，${data.admin.nickname || data.admin.username}`);
      // 确保状态已写入后再跳转
      setTimeout(() => {
        const from = (location.state as { from?: { pathname: string } } | null)
          ?.from?.pathname;
        navigate(from || '/dashboard', { replace: true });
      }, 50);
    } catch (err) {
      console.error('[登录失败]', err);
      // 错误已由拦截器统一提示
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at 20% 20%, #fdf6ee 0%, #f5e8d8 40%, #ead0b5 100%)',
        padding: 16,
      }}
    >
      <div
        style={{
          width: 380,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: 16,
          padding: '36px 32px 28px',
          boxShadow: '0 20px 60px rgba(159, 74, 34, 0.18)',
          border: '1px solid rgba(217, 119, 66, 0.15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              margin: '0 auto 14px',
              background: 'linear-gradient(135deg, #d97742 0%, #9f4a22 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: 24,
              boxShadow: '0 8px 20px rgba(194, 94, 44, 0.35)',
            }}
          >
            茸
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: '#1f1f1f',
            }}
          >
            毛茸手作 · 后台管理
          </h1>
          <p style={{ margin: '6px 0 0', color: '#8c8c8c', fontSize: 13 }}>
            手作宠物零食管理平台
          </p>
        </div>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            username: 'admin',
            password: 'admin123',
            remember: true,
          }}
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住账号</Checkbox>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, marginTop: 18 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ height: 44, fontWeight: 600 }}
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{
            marginTop: 18,
            textAlign: 'center',
            fontSize: 12,
            color: '#bfbfbf',
          }}
        >
          默认账号 admin / admin123 · 仅供测试
        </div>
      </div>
    </div>
  );
}
