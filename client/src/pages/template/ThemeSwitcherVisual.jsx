import { Card, Row, Col, Tooltip, Button } from 'antd';
import { CheckCircleOutlined, BgColorsOutlined, CrownOutlined, HeartOutlined, FireOutlined, BulbOutlined, SmileOutlined, PlusOutlined, MoonOutlined } from '@ant-design/icons';
import { themes } from '../../config/theme';

const iconMap = {
  BgColorsOutlined,
  CrownOutlined,
  HeartOutlined,
  FireOutlined,
  BulbOutlined,
  SmileOutlined,
  PlusOutlined,
  MoonOutlined,
};

const getIcon = (iconName) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent /> : null;
};

export default function ThemeSwitcherVisual({ currentTheme, onThemeChange }) {
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
        <h3 style={{ margin: 0, fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600 }}>Choose Theme</h3>
      </div>
      <Row gutter={['clamp(8px, 2vw, 12px)', 'clamp(8px, 2vw, 12px)']}>
        {Object.entries(themes).map(([key, theme]) => (
          <Col key={key} xs={12} sm={12} md={12} lg={8} xl={6}>
            <Tooltip title={theme.description} placement="top">
              <Button
                onClick={() => onThemeChange(key)}
                style={{
                  width: '100%',
                  height: 'auto',
                  padding: 'clamp(8px, 2vw, 12px)',
                  border: currentTheme === key ? `2px solid ${theme.colors[0]}` : '1px solid #d9d9d9',
                  background: 'white',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: currentTheme === key ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.03)',
                  transform: currentTheme === key ? 'translateY(-2px)' : 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = currentTheme === key ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.transform = currentTheme === key ? 'translateY(-2px)' : 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div style={{ fontSize: 'clamp(16px, 4vw, 24px)', marginBottom: 8, color: theme.colors[0] }}>
                    {getIcon(theme.icon)}
                  </div>
                  <div style={{ display: 'flex', gap: 'clamp(2px, 1vw, 4px)', marginBottom: 8, justifyContent: 'center' }}>
                    <div
                      style={{
                        width: 'clamp(16px, 3vw, 20px)',
                        height: 'clamp(16px, 3vw, 20px)',
                        borderRadius: 4,
                        backgroundColor: theme.colors[0],
                        border: '1px solid #ddd',
                      }}
                    />
                    <div
                      style={{
                        width: 'clamp(16px, 3vw, 20px)',
                        height: 'clamp(16px, 3vw, 20px)',
                        borderRadius: 4,
                        backgroundColor: theme.colors[1],
                        border: '1px solid #ddd',
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 600, textAlign: 'center', color: '#333', lineHeight: 1.3 }}>
                    {theme.name}
                  </div>
                </div>
                {currentTheme === key && (
                  <CheckCircleOutlined
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      fontSize: 18,
                      color: theme.colors[0],
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
