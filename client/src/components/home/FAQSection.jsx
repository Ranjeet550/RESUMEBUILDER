import { Row, Col, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export function FAQSection() {
  const faqs = [
    { q: 'Is Resumify free to use?', a: 'Yes! Resumify is completely free. Create unlimited resumes and download them anytime.' },
    { q: 'Can I edit my resume later?', a: 'Absolutely! All your resumes are saved in Resumify and you can edit them anytime from your dashboard.' },
    { q: 'What file formats can I download?', a: 'You can download your resume from Resumify as PDF or Word document for easy sharing and printing.' },
    { q: 'How does Resumify AI work?', a: 'Resumify\'s AI analyzes your content and suggests improvements to make your resume more impactful and ATS-friendly.' }
  ];

  return (
    <div style={{ padding: 'clamp(30px, 8vw, 80px) clamp(16px, 5vw, 50px)', background: '#ffffff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 5vw, 3rem)', color: '#1f2937', fontWeight: 900, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', letterSpacing: '-0.5px' }}>
        Resumify FAQs
      </Title>

      <Row style={{ maxWidth: '900px', margin: '0 auto' }}>
        {faqs.map((faq, idx) => (
          <Col key={idx} xs={24} style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
            <div
              style={{
                padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '1.1rem',
                flexShrink: 0,
                marginTop: '0.25rem'
              }}>
                ?
              </div>
              <div style={{ flex: 1 }}>
                <Title level={5} style={{ color: '#1f2937', fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', marginBottom: '0.5rem', marginTop: 0 }}>
                  {faq.q}
                </Title>
                <Paragraph style={{ color: '#6b7280', fontWeight: 500, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', lineHeight: 1.6, marginBottom: 0 }}>
                  {faq.a}
                </Paragraph>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
