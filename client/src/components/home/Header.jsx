import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';

export function Header({ isAuthenticated }) {
  const navigate = useNavigate();

  const buttonStyle = {
    fontWeight: 700,
    color: '#1f2937',
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    transition: 'all 0.3s ease',
    borderRadius: '8px',
    padding: '8px 16px',
  };

  const primaryButtonStyle = {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    fontWeight: 700,
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    border: 'none',
    borderRadius: '8px',
    height: 'auto',
    padding: '8px 20px',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    transition: 'all 0.3s ease',
  };

  return (
    <header
      style={{
        background: 'linear-gradient(90deg, #ffffff 0%, #f0fdf4 100%)',
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: 'max(20px, 5%)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 'auto',
        padding: '16px max(20px, 5%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
          fontWeight: 900,
          color: '#10b981',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          whiteSpace: 'nowrap',
          transition: 'all 0.3s ease',
        }}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <ThunderboltOutlined style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', color: '#10b981' }} />
        <span style={{ display: 'inline' }}>Resumify</span>
      </div>

      <Space size={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap>
        {isAuthenticated ? (
          <>
            <Button
              type="text"
              onClick={() => navigate('/dashboard')}
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1f2937';
              }}
            >
              Dashboard
            </Button>
            <Button
              type="primary"
              onClick={() => navigate('/editor')}
              style={primaryButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
              }}
            >
              Create Resume
            </Button>
          </>
        ) : (
          <>
            <Button
              type="text"
              onClick={() => navigate('/login')}
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1f2937';
              }}
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={() => navigate('/register')}
              style={primaryButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Space>
    </header>
  );
}
