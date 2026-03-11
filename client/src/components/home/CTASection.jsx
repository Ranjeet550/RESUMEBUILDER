import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export function CTASection() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div
      className="cta-section"
      style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        padding: 'clamp(30px, 8vw, 80px) clamp(16px, 5vw, 50px)',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Title level={2} style={{ color: '#ffffff', marginBottom: 'clamp(0.5rem, 2vw, 1rem)', fontWeight: 900, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', letterSpacing: '-0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        Ready to Land Your Dream Job with Resumify?
      </Title>
      <Paragraph style={{ fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', color: '#ffffff', marginBottom: 'clamp(1rem, 3vw, 2rem)', fontWeight: 600, fontFamily: "'Inter', sans-serif", textShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        Join thousands of professionals who've already created their perfect resume with Resumify
      </Paragraph>
      <Button
        type="primary"
        size="large"
        onClick={handleGetStarted}
        style={{
          background: '#ffffff',
          color: '#10b981',
          fontWeight: 700,
          height: 'clamp(40px, 10vw, 50px)',
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          border: 'none',
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: '0.5px',
          padding: '0 clamp(12px, 3vw, 24px)',
        }}
        icon={<ArrowRightOutlined />}
      >
        Start Building Now
      </Button>
    </div>
  );
}
