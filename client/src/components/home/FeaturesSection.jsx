import { Carousel, Typography } from 'antd';
import { FileTextOutlined, RobotOutlined, ThunderboltOutlined, MobileOutlined, SaveOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export function FeaturesSection() {
  const features = [
    {
      icon: <FileTextOutlined style={{ fontSize: '2.5rem', color: '#10b981' }} />,
      title: 'Beautiful Templates',
      description: 'Choose from professionally designed templates that make your resume stand out'
    },
    {
      icon: <RobotOutlined style={{ fontSize: '2.5rem', color: '#059669' }} />,
      title: 'AI-Powered',
      description: 'Get intelligent suggestions to improve your content and highlight your strengths'
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: '2.5rem', color: '#10b981' }} />,
      title: 'Lightning Fast',
      description: 'Create a professional resume in minutes, not hours'
    },
    {
      icon: <MobileOutlined style={{ fontSize: '2.5rem', color: '#059669' }} />,
      title: 'Fully Responsive',
      description: 'Works seamlessly on desktop, tablet, and mobile devices'
    },
    {
      icon: <SaveOutlined style={{ fontSize: '2.5rem', color: '#10b981' }} />,
      title: 'Auto-Save',
      description: 'Your work is automatically saved so you never lose progress'
    },
    {
      icon: <DownloadOutlined style={{ fontSize: '2.5rem', color: '#059669' }} />,
      title: 'Easy Export',
      description: 'Download your resume as PDF or share it directly with employers'
    }
  ];

  return (
    <div className="features-section" style={{ padding: 'clamp(30px, 8vw, 80px) clamp(16px, 5vw, 50px)', background: '#f3f4f6' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 5vw, 3rem)', color: '#1f2937', fontWeight: 900, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', letterSpacing: '-0.5px' }}>
        Why Choose Resumify?
      </Title>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Carousel
          autoplay
          autoplaySpeed={5000}
          dots={true}
          dotPosition="bottom"
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
              }
            }
          ]}
        >
          {features.map((feature, idx) => (
            <div key={idx} style={{ padding: '0 clamp(0.5rem, 1vw, 1rem)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(1rem, 2vw, 1.5rem)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
                <div style={{
                  width: 'clamp(70px, 14vw, 90px)',
                  height: 'clamp(70px, 14vw, 90px)',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  boxShadow: '0 12px 30px rgba(16, 185, 129, 0.25)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}>
                  {feature.icon}
                </div>
                <div>
                  <Title level={4} style={{ color: '#1f2937', fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '0.5rem', marginTop: 0 }}>{feature.title}</Title>
                  <Paragraph style={{ color: '#6b7280', fontWeight: 500, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.85rem, 2vw, 1rem)', lineHeight: 1.7, marginBottom: 0 }}>
                    {feature.description}
                  </Paragraph>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
