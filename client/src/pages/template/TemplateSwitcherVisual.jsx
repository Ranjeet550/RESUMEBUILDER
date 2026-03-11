import { Row, Col, Tooltip, Button } from 'antd';
import { CheckCircleOutlined, BgColorsOutlined, FileTextOutlined, MinusOutlined, SmileOutlined, BookOutlined } from '@ant-design/icons';

const templates = {
  modern: {
    name: 'Modern',
    description: 'Clean and contemporary design',
    icon: <BgColorsOutlined />,
    preview: '━━━━━━━━━━\n━━━━━━━━━━\n━ ━ ━ ━ ━',
  },
  classic: {
    name: 'Classic',
    description: 'Traditional professional layout',
    icon: <FileTextOutlined />,
    preview: '┌─────────┐\n│ ━━━━━━ │\n│ ━ ━ ━ │',
  },
  minimal: {
    name: 'Minimal',
    description: 'Simple and elegant',
    icon: <MinusOutlined />,
    preview: '━━━━━━━━━━\n\n━ ━ ━ ━ ━',
  },
  creative: {
    name: 'Creative',
    description: 'Bold and eye-catching',
    icon: <SmileOutlined />,
    preview: '◆ ━━━━━━ ◆\n━━━━━━━━━━\n━ ━ ━ ━ ━',
  },
  academic: {
    name: 'Academic',
    description: 'Formal and detailed',
    icon: <BookOutlined />,
    preview: '━━━━━━━━━━\n━━━━━━━━━━\n━━━━━━━━━━',
  },
};

export default function TemplateSwitcherVisual({ currentTemplate, onTemplateChange }) {
  return (
    <div style={{
      background: 'white',
      padding: 'clamp(12px, 3vw, 20px)',
      borderRadius: 8,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
      marginBottom: 20,
    }}>
      <div style={{
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: '1px solid #f0f0f0',
      }}>
        <h3 style={{ margin: 0, fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600 }}>Choose Template</h3>
      </div>
      <Row gutter={['clamp(8px, 2vw, 12px)', 'clamp(8px, 2vw, 12px)']}>
        {Object.entries(templates).map(([key, template]) => (
          <Col key={key} xs={12} sm={12} md={12} lg={8} xl={6}>
            <Tooltip title={template.description} placement="top">
              <Button
                onClick={() => onTemplateChange(key)}
                style={{
                  width: '100%',
                  height: 'auto',
                  padding: 'clamp(8px, 2vw, 12px)',
                  border: currentTemplate === key ? '2px solid #1890ff' : '1px solid #d9d9d9',
                  background: 'white',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: currentTemplate === key ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.03)',
                  transform: currentTemplate === key ? 'translateY(-2px)' : 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = currentTemplate === key ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.transform = currentTemplate === key ? 'translateY(-2px)' : 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div style={{ fontSize: 'clamp(16px, 4vw, 24px)', marginBottom: 8, color: '#1890ff' }}>
                    {template.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 'clamp(7px, 1.5vw, 9px)',
                      lineHeight: 1.2,
                      color: '#999',
                      marginBottom: 8,
                      textAlign: 'center',
                      whiteSpace: 'pre',
                      background: '#f5f5f5',
                      padding: 'clamp(6px, 1.5vw, 8px)',
                      borderRadius: 4,
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    {template.preview}
                  </div>
                  <div style={{ fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 600, textAlign: 'center', color: '#333', lineHeight: 1.3 }}>
                    {template.name}
                  </div>
                </div>
                {currentTemplate === key && (
                  <CheckCircleOutlined
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      fontSize: 18,
                      color: '#1890ff',
                    }}
                  />
                )}
              </Button>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </div>
  );
}
