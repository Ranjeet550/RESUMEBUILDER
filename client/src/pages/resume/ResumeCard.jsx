import { Button, Dropdown } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, CalendarOutlined } from '@ant-design/icons';

export default function ResumeCard({ resume, onEdit, onDelete, viewMode = 'grid' }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMenuItems = () => [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit',
      onClick: () => onEdit(resume._id)
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Delete',
      danger: true,
      onClick: () => onDelete(resume._id)
    }
  ];

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: viewMode === 'card' ? '16px 24px' : '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: '1px solid #e2e8f0',
        display: viewMode === 'card' ? 'flex' : 'flex',
        flexDirection: viewMode === 'card' ? 'row' : 'column',
        justifyContent: viewMode === 'card' ? 'space-between' : 'space-between',
        alignItems: viewMode === 'card' ? 'center' : 'flex-start',
        gap: viewMode === 'card' ? '20px' : '0'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Card Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: viewMode === 'card' ? 'center' : 'flex-start',
        marginBottom: viewMode === 'card' ? '0' : '16px',
        flex: viewMode === 'card' ? 1 : 'auto',
        width: viewMode === 'card' ? 'auto' : '100%',
        minWidth: 0
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a202c',
            wordBreak: 'break-word',
            marginBottom: viewMode === 'card' ? '0' : '8px'
          }}>
            {resume.title}
          </h3>
          {viewMode === 'grid' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#718096',
              fontSize: '14px'
            }}>
              <CalendarOutlined style={{ fontSize: '12px' }} />
              {formatDate(resume.createdAt)}
            </div>
          )}
        </div>
        {viewMode === 'grid' && (
          <Dropdown
            menu={{ items: getMenuItems() }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              style={{
                color: '#718096',
                border: 'none',
                padding: '4px 8px'
              }}
            />
          </Dropdown>
        )}
      </div>

      {viewMode === 'card' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#718096',
          fontSize: '14px',
          whiteSpace: 'nowrap'
        }}>
          <CalendarOutlined style={{ fontSize: '12px' }} />
          {formatDate(resume.createdAt)}
        </div>
      )}

      {/* Card Footer */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: viewMode === 'card' ? '0' : '16px',
        paddingTop: viewMode === 'card' ? '0' : '16px',
        borderTop: viewMode === 'card' ? 'none' : '1px solid #e2e8f0',
        width: viewMode === 'card' ? 'auto' : '100%'
      }}>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => onEdit(resume._id)}
          style={{
            flex: viewMode === 'card' ? 'auto' : 1,
            height: '36px',
            fontWeight: '600',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            border: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            minWidth: viewMode === 'card' ? '80px' : 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          }}
        >
          {viewMode === 'card' ? 'Edit' : 'Edit'}
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(resume._id)}
          style={{
            height: '36px',
            fontWeight: '600',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            border: 'none',
            color: 'white',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            minWidth: viewMode === 'card' ? '36px' : 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.4)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          }}
        />
      </div>
    </div>
  );
}
