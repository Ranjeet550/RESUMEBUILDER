import { useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('auth/login', values);
      login(response.data.user, response.data.token);
      message.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px'
      }}>
        <Card style={{
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: 'none',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '40px 32px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '800',
              marginBottom: '12px',
              color: '#1a1a1a',
              letterSpacing: '-0.5px',
              lineHeight: '1.2'
            }}>
              Resume Builder
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#666',
              fontWeight: '500',
              letterSpacing: '0.3px',
              lineHeight: '1.5'
            }}>
              Welcome back to your account
            </p>
          </div>
          
          <Spin spinning={loading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Invalid email' }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#00b96b', fontSize: '16px' }} />}
                  placeholder="Email address"
                  size="large"
                  style={{
                    borderRadius: '10px',
                    border: '1.5px solid #e8e8e8',
                    transition: 'all 0.3s ease',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#1a1a1a',
                    letterSpacing: '0.2px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00b96b';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 185, 107, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e8e8e8';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#00b96b', fontSize: '16px' }} />}
                  placeholder="Password"
                  size="large"
                  style={{
                    borderRadius: '10px',
                    border: '1.5px solid #e8e8e8',
                    transition: 'all 0.3s ease',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#1a1a1a',
                    letterSpacing: '0.2px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00b96b';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 185, 107, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e8e8e8';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Form.Item>

              <Form.Item style={{ marginTop: '28px' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  size="large"
                  icon={<ArrowRightOutlined />}
                  style={{
                    borderRadius: '10px',
                    height: '44px',
                    fontSize: '15px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #00b96b 0%, #13c2c2 100%)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 185, 107, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 185, 107, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 185, 107, 0.4)';
                  }}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Spin>

          <div style={{
            textAlign: 'center',
            marginTop: '28px',
            paddingTop: '28px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <p style={{
              fontSize: '15px',
              color: '#666',
              margin: 0,
              fontWeight: '500',
              letterSpacing: '0.2px'
            }}>
              Don't have an account?{' '}
              <Link to="/register" style={{
                color: '#00b96b',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'color 0.3s ease',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => e.target.style.color = '#13c2c2'}
              onMouseLeave={(e) => e.target.style.color = '#00b96b'}
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
