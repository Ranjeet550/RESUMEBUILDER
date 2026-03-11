import { Button, Spin, message } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getAISuggestion } from '../../api/aiSuggestions';

const gradientStyle = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

export default function AISuggestionButton({ fieldType, context, onSuggestion }) {
  const [loading, setLoading] = useState(false);

  // Add style to document
  if (typeof document !== 'undefined' && !document.getElementById('gradient-animation')) {
    const style = document.createElement('style');
    style.id = 'gradient-animation';
    style.textContent = gradientStyle;
    document.head.appendChild(style);
  }

  const handleGetSuggestion = async () => {
    if (!context || context.trim() === '') {
      message.warning('Please provide some context first');
      return;
    }

    setLoading(true);
    try {
      const suggestion = await getAISuggestion(fieldType, context);
      onSuggestion(suggestion);
      message.success('Suggestion generated');
    } catch (error) {
      message.error('Failed to generate suggestion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      size="large"
      icon={<ThunderboltOutlined style={{ fontSize: 18, fontWeight: 'bold' }} />}
      onClick={handleGetSuggestion}
      loading={loading}
      style={{
        marginTop: 12,
        marginBottom: 8,
        fontWeight: 700,
        fontSize: 15,
        height: 42,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        border: 'none',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        backgroundSize: '200% 200%',
        animation: 'gradient 3s ease infinite'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
      }}
    >
      {loading ? 'Generating...' : 'Ask AI'}
    </Button>
  );
}
