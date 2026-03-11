import { Layout, ConfigProvider } from 'antd';
import { useAuthStore } from '../../store/authStore';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

// Add Google Fonts
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap');
  
  * {
    font-family: 'Inter', 'Poppins', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', 'Poppins', sans-serif;
    letter-spacing: -0.5px;
  }
  
  .ant-btn {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  /* Responsive Typography */
  @media (max-width: 1200px) {
    h1 { font-size: 2.5rem !important; }
    h2 { font-size: 2rem !important; }
  }

  @media (max-width: 768px) {
    h1 { font-size: 2rem !important; }
    h2 { font-size: 1.5rem !important; }
    h3 { font-size: 1.25rem !important; }
    h4 { font-size: 1rem !important; }
  }

  @media (max-width: 480px) {
    h1 { font-size: 1.5rem !important; }
    h2 { font-size: 1.25rem !important; }
    h3 { font-size: 1rem !important; }
    h4 { font-size: 0.9rem !important; }
    
    .ant-btn {
      height: 40px !important;
      font-size: 0.9rem !important;
      padding: 0 12px !important;
    }
  }

  /* Responsive Padding */
  @media (max-width: 768px) {
    .hero-section {
      padding: 40px 20px !important;
    }
    .features-section {
      padding: 40px 20px !important;
    }
    .cta-section {
      padding: 40px 20px !important;
    }
  }

  @media (max-width: 480px) {
    .hero-section {
      padding: 30px 16px !important;
    }
    .features-section {
      padding: 30px 16px !important;
    }
    .cta-section {
      padding: 30px 16px !important;
    }
  }
`;
document.head.appendChild(style);

const { Content } = Layout;

function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#10b981',
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header isAuthenticated={isAuthenticated} />
        <Content>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}

export default Home;
