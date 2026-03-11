import { useState, useEffect } from 'react';
import { Button, Modal, message, ConfigProvider, Input, Table, Segmented } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import DashboardHeader from './DashboardHeader';
import ResumeList from '../../pages/resume/ResumeList';
import CreateResumeModal from '../../pages/resume/CreateResumeModal';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await api.get('resume');
      setResumes(response.data);
    } catch (error) {
      message.error('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (resumeId) => {
    navigate(`/editor/${resumeId}`);
  };

  const handleDelete = async (resumeId) => {
    Modal.confirm({
      title: 'Delete Resume',
      content: 'Are you sure you want to delete this resume? This action cannot be undone.',
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await api.delete(`resume/${resumeId}`);
          message.success('Resume deleted successfully');
          fetchResumes();
        } catch (error) {
          message.error('Failed to delete resume');
        }
      }
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredResumes = resumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'S.N.',
      key: 'sn',
      render: (_, __, index) => (
        <span style={{ fontWeight: '600', color: '#10b981', fontSize: '14px' }}>
          {index + 1}
        </span>
      ),
      width: '8%',
      align: 'center'
    },
    {
      title: 'Resume Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span style={{ fontWeight: '600', color: '#1a202c', fontSize: '14px' }}>{text}</span>,
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend'],
      width: '40%',
      align: 'center',
      ellipsis: true
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <span style={{ color: '#718096', fontSize: '13px' }}>
          {formatDate(date)}
        </span>
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ['ascend', 'descend'],
      width: '25%',
      align: 'center'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
            size="small"
            style={{
              height: '32px',
              fontWeight: '600',
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '12px'
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
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            size="small"
            style={{
              height: '32px',
              fontWeight: '600',
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              border: 'none',
              color: 'white',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '12px'
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
      ),
      width: '27%',
      fixed: 'right',
      align: 'center'
    }
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#10b981',
          borderRadius: 8,
        },
      }}
    >
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <DashboardHeader />

        {/* Main Content */}
        <div style={{ 
          flex: 1,
          padding: '32px 20px'
        }}>
          <div style={{ 
            maxWidth: 1400, 
            margin: '0 auto'
          }}>
            {/* Header Section */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h1 style={{ 
                  margin: 0, 
                  fontSize: '32px', 
                  fontWeight: '700',
                  color: '#1a202c',
                  letterSpacing: '-0.5px'
                }}>
                  My Resumes
                </h1>
                <p style={{ 
                  margin: '6px 0 0 0', 
                  color: '#718096', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Manage and edit your professional resumes
                </p>
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
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
                Create Resume
              </Button>
            </div>

            {/* Search Box and View Toggle */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <Input
                placeholder="Search resumes..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  height: '32px',
                  borderRadius: '6px',
                  maxWidth: '300px',
                  fontSize: '13px'
                }}
              />
              <Segmented
                value={viewMode}
                onChange={setViewMode}
                options={[
                  { 
                    label: <AppstoreOutlined style={{ fontSize: '16px' }} />, 
                    value: 'card',
                    title: 'Card View'
                  },
                  { 
                    label: <UnorderedListOutlined style={{ fontSize: '16px' }} />, 
                    value: 'table',
                    title: 'Table View'
                  }
                ]}
                style={{
                  background: '#f3f4f6',
                  padding: '4px'
                }}
              />
            </div>

            {/* Card View */}
            {viewMode === 'card' && (
              <ResumeList 
                resumes={filteredResumes}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreateNew={() => setIsModalVisible(true)}
              />
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <Table
                columns={columns}
                dataSource={filteredResumes.map(resume => ({ ...resume, key: resume._id }))}
                loading={loading}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} resumes`,
                  style: { marginTop: '16px' }
                }}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
                rowStyle={{
                  height: '60px'
                }}
                scroll={{ x: 600 }}
                locale={{
                  emptyText: 'No resumes found'
                }}
              />
            )}
          </div>
        </div>

        {/* Create Resume Modal */}
        <CreateResumeModal 
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSuccess={fetchResumes}
        />
      </div>
    </ConfigProvider>
  );
}
