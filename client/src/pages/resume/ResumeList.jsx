import { Button, Spin } from 'antd';
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons';
import ResumeCard from './ResumeCard';

export default function ResumeList({ resumes, loading, onEdit, onDelete, onCreateNew, viewMode = 'grid' }) {
  if (resumes.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '60px 40px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <FileTextOutlined style={{ fontSize: '64px', color: '#cbd5e0', marginBottom: '20px' }} />
        <h2 style={{ color: '#2d3748', fontSize: '24px', marginBottom: '12px' }}>
          No resumes yet
        </h2>
        <p style={{ color: '#718096', fontSize: '16px', marginBottom: '32px' }}>
          Create your first resume to get started building your professional profile
        </p>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onCreateNew}
          style={{ 
            height: '36px',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            border: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
          Create Your First Resume
        </Button>
      </div>
    );
  }

  return (
    <Spin spinning={loading} tip="Loading your resumes...">
      <div style={{
        display: viewMode === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : undefined,
        flexDirection: viewMode === 'card' ? 'column' : undefined,
        gap: viewMode === 'grid' ? '24px' : '16px'
      }}>
        {resumes.map((resume) => (
          <ResumeCard
            key={resume._id}
            resume={resume}
            onEdit={onEdit}
            onDelete={onDelete}
            viewMode={viewMode}
          />
        ))}
      </div>
    </Spin>
  );
}
