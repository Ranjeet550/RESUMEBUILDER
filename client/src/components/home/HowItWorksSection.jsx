import { Carousel, Typography } from 'antd';
import { FileTextOutlined, BgColorsOutlined, RobotOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export function HowItWorksSection() {
  const steps = [
    { step: '1', title: 'Sign Up', description: 'Create your free account in seconds', icon: <FileTextOutlined /> },
    { step: '2', title: 'Choose Template', description: 'Pick from our beautiful resume templates', icon: <BgColorsOutlined /> },
    { step: '3', title: 'Add Content', description: 'Fill in your information with AI suggestions', icon: <RobotOutlined /> },
    { step: '4', title: 'Download', description: 'Export as PDF and apply to jobs', icon: <DownloadOutlined /> }
  ];

  return (
    <div className="features-section" style={{ padding: 'clamp(30px, 8vw, 80px) clamp(16px, 5vw, 50px)', background: '#ffffff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 5vw, 3rem)', color: '#1f2937', fontWeight: 900, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', letterSpacing: '-0.5px' }}>
        How Resumify Works
      </Title>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Carousel
          autoplay
          autoplaySpeed={4000}
          dots={true}
          dotPosition="bottom"
        >
          {steps.map((item, idx) => (
            <div key={idx}>
              <div style={{ textAlign: 'center', padding: 'clamp(2rem, 4vw, 3rem)' }}>
                <div style={{
                  width: 'clamp(80px, 15vw, 120px)',
                  height: 'clamp(80px, 15vw, 120px)',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 900,
                  margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                }}>
                  {item.icon}
                </div>
                <Title level={4} style={{ color: '#1f2937', fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '0.5rem' }}>{item.title}</Title>
                <Paragraph style={{ color: '#6b7280', fontWeight: 500, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                  {item.description}
                </Paragraph>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
