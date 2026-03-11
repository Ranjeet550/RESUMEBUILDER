import { Button, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getProfileMenuItems = () => [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'View Profile',
      onClick: () => navigate('/profile')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout
    }
  ];

  return (
    <nav style={{
      background: 'linear-gradient(90deg, #ffffff 0%, #f0fdf4 100%)',
      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(16, 185, 129, 0.1)'
    }}>
      {/* Logo and Brand */}
      <div style={{
        fontSize: '24px',
        fontWeight: '900',
        color: '#10b981',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.3s ease'
      }}
      onClick={() => navigate('/dashboard')}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}>
        <ThunderboltOutlined style={{ fontSize: '28px', color: '#10b981' }} />
        <span>Resumify</span>
      </div>

      {/* Right Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <span style={{
          color: '#10b981',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {user?.name}
        </span>
        <Dropdown
          menu={{ items: getProfileMenuItems() }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<UserOutlined />}
            style={{
              fontSize: '18px',
              color: '#1a202c',
              border: '1px solid #e2e8f0',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
              e.currentTarget.style.borderColor = '#10b981';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          />
        </Dropdown>
      </div>
    </nav>
  );
}
