import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button, Row, Col, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export function HeroSection() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = [
    'Build Your Perfect Resume',
    'Powered by AI',
    'Stand Out to Employers',
    'Get Hired Faster'
  ];

  const stats = [
    { value: '10K+', label: 'Resumes Created' },
    { value: '95%', label: 'Success Rate' },
    { value: '24/7', label: 'AI Support' }
  ];

  useEffect(() => {
    let timer;
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];
      const updatedText = isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1);

      setDisplayText(updatedText);
      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && updatedText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div
      className="hero-section"
      style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        padding: 'clamp(30px, 8vw, 80px) clamp(16px, 5vw, 50px)',
        textAlign: 'center',
        color: '#fff',
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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

      {/* Animated background elements */}
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

      <Row gutter={[50, 50]} style={{ width: '100%', maxWidth: '1200px', position: 'relative', zIndex: 2 }} align="middle">
        {/* Left Content */}
        <Col xs={24} md={12} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
              borderRadius: '50px',
              fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '1px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)',
            }}>
              ✨ AI-Powered Resume Builder
            </span>
          </div>

          <Title
            level={1}
            style={{
              color: '#ffffff',
              fontSize: 'clamp(1.75rem, 8vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '-1px',
              textShadow: '0 4px 8px rgba(0,0,0,0.15)',
            }}
          >
            {displayText}
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '1em',
                background: '#ffffff',
                marginLeft: '5px',
                animation: 'blink 1s infinite',
              }}
            />
          </Title>

          <Paragraph
            style={{
              fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
              lineHeight: 1.7,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.3px',
            }}
          >
            Create a professional resume in minutes with Resumify's AI-powered suggestions and beautiful templates. Land your dream job faster.
          </Paragraph>

          <div style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <Button
              type="primary"
              size="large"
              onClick={handleGetStarted}
              style={{
                background: '#ffffff',
                color: '#10b981',
                fontWeight: 700,
                height: 'clamp(44px, 10vw, 52px)',
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                border: 'none',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: '0.5px',
                padding: '0 clamp(16px, 3vw, 28px)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
              }}
            >
              Start Free Now
            </Button>
          </div>

          <Row gutter={[24, 16]} style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            {stats.map((stat, idx) => (
              <Col key={idx} xs={12} sm={8}>
                <div>
                  <Text style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: 900, color: '#ffffff', display: 'block', marginBottom: '0.25rem' }}>
                    {stat.value}
                  </Text>
                  <Text style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
                    {stat.label}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Right Visual */}
        <Col xs={24} md={12}>
          <div style={{
            position: 'relative',
            height: 'clamp(300px, 50vw, 500px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Main card */}
            <div style={{
              position: 'absolute',
              width: '90%',
              maxWidth: '350px',
              background: '#ffffff',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
              zIndex: 3,
              animation: 'float 4s ease-in-out infinite',
            }}>
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📄</div>
                <Text strong style={{ color: '#1f2937', fontSize: '1.1rem', display: 'block' }}>
                  Smart Resume
                </Text>
                <Text style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  AI-Enhanced
                </Text>
              </div>
              <div style={{ height: '8px', background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', borderRadius: '4px', marginBottom: '1rem' }}></div>
              <Text style={{ color: '#4b5563', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Get instant suggestions to improve your resume and stand out to employers.
              </Text>
            </div>

            {/* Floating card 1 */}
            <div style={{
              position: 'absolute',
              width: '140px',
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1rem',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
              top: '10%',
              right: '5%',
              zIndex: 2,
              animation: 'float 5s ease-in-out infinite 0.5s',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
              <Text strong style={{ color: '#1f2937', fontSize: '0.9rem', display: 'block' }}>
                AI Power
              </Text>
            </div>

            {/* Floating card 2 */}
            <div style={{
              position: 'absolute',
              width: '140px',
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1rem',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
              bottom: '15%',
              left: '5%',
              zIndex: 2,
              animation: 'float 6s ease-in-out infinite 1s',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <Text strong style={{ color: '#1f2937', fontSize: '0.9rem', display: 'block' }}>
                Lightning Fast
              </Text>
            </div>
          </div>
        </Col>
      </Row>

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
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
