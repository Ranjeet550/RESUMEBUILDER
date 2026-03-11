import { Carousel, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export function TestimonialsSection() {
  const testimonials = [
    { name: 'Sarah Johnson', role: 'Marketing Manager', text: 'ResumeAI helped me land my dream job! The AI suggestions were incredibly helpful.', image: '👩‍💼' },
    { name: 'Michael Chen', role: 'Software Engineer', text: 'Best resume builder I\'ve used. Clean interface and amazing templates.', image: '👨‍💻' },
    { name: 'Emily Rodriguez', role: 'Product Designer', text: 'The AI-powered suggestions saved me hours. Highly recommended!', image: '👩‍🎨' }
  ];

  return (
    <div style={{ padding: 'clamp(30px, 8vw, 80px) clamp(16px, 5vw, 50px)', background: '#f3f4f6' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 5vw, 3rem)', color: '#1f2937', fontWeight: 900, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', letterSpacing: '-0.5px' }}>
        Resumify Success Stories
      </Title>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Carousel
          autoplay
          autoplaySpeed={5000}
          dots={true}
          dotPosition="bottom"
          style={{
            background: 'transparent',
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <div key={idx}>
              <div style={{
                padding: 'clamp(2rem, 4vw, 3rem)',
                background: '#ffffff',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              }}>
                <div style={{ marginBottom: '1.5rem', color: '#ffc107', fontSize: '1.3rem', letterSpacing: '2px' }}>
                  ★★★★★
                </div>

                <Paragraph style={{
                  color: '#4b5563',
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                  marginBottom: '2rem',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                }}>
                  "{testimonial.text}"
                </Paragraph>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(1rem, 2vw, 1.5rem)',
                }}>
                  <div style={{
                    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                    lineHeight: 1
                  }}>
                    {testimonial.image}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <Text strong style={{
                      color: '#1f2937',
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                      display: 'block',
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.name}
                    </Text>
                    <Text style={{
                      color: '#10b981',
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                      fontWeight: 600
                    }}>
                      {testimonial.role}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
