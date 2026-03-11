import { useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, ArrowRightOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('auth/register', values);
      if (response.data && response.data.user && response.data.token) {
        login(response.data.user, response.data.token);
        message.success('Registration successful');
        navigate('/dashboard');
      } else {
        message.error('Invalid response from server');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Registration failed');
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
      padding: '20px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ripple Grid Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.08) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.08) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '120px 120px',
        animation: 'rippleGrid 20s linear infinite',
        zIndex: 1,
      }}></div>

      {/* Animated circles */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 1,
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite 1s',
        zIndex: 1,
      }}></div>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Home Icon Button */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          left: 0,
          zIndex: 10,
        }}>
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<HomeOutlined style={{ fontSize: '1.2rem' }} />}
            onClick={() => navigate('/')}
            style={{
              background: '#ffffff',
              color: '#10b981',
              border: 'none',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            }}
          />
        </div>
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
              Resumify
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#666',
              fontWeight: '500',
              letterSpacing: '0.3px',
              lineHeight: '1.5'
            }}>
              Create your account to get started
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
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#00b96b', fontSize: '16px' }} />}
                  placeholder="Full name"
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
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Invalid email' }
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: '#00b96b', fontSize: '16px' }} />}
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
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 6, message: 'Password must be at least 6 characters' }
                ]}
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

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    }
                  })
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#00b96b', fontSize: '16px' }} />}
                  placeholder="Confirm password"
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
                  Sign Up
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
              Already have an account?{' '}
              <Link to="/login" style={{
                color: '#00b96b',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'color 0.3s ease',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => e.target.style.color = '#13c2c2'}
              onMouseLeave={(e) => e.target.style.color = '#00b96b'}
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes rippleGrid {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 120px 120px;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
