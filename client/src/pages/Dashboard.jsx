import { useState, useEffect } from 'react';
import { Button, Modal, Input, message, Spin, Empty, Tooltip, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LogoutOutlined, MoreOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { useResumeStore } from '../store/resumeStore';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newResumeName, setNewResumeName] = useState('');
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const setResume = useResumeStore((state) => state.setResume);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/resume');
      setResumes(response.data);
    } catch (error) {
      message.error('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    if (!newResumeName.trim()) {
      message.error('Please enter a resume name');
      return;
    }

    try {
      const response = await api.post('/resume', {
        title: newResumeName,
        personalInfo: {},
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
      });
      setResume(response.data);
      message.success('Resume created successfully');
      setIsModalVisible(false);
      setNewResumeName('');
      navigate(`/editor/${response.data._id}`);
    } catch (error) {
      message.error('Failed to create resume');
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
          await api.delete(`/resume/${resumeId}`);
          message.success('Resume deleted successfully');
          fetchResumes();
        } catch (error) {
          message.error('Failed to delete resume');
        }
      }
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMenuItems = (resumeId) => [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit',
      onClick: () => handleEdit(resumeId)
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Delete',
      danger: true,
      onClick: () => handleDelete(resumeId)
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '36px', 
              fontWeight: '700',
              color: '#1a202c',
              letterSpacing: '-0.5px'
            }}>
              My Resumes
            </h1>
            <p style={{ 
              margin: '8px 0 0 0', 
              color: '#718096', 
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Welcome back, <span style={{ color: '#2d3748', fontWeight: '600' }}>{user?.name}</span>
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setIsModalVisible(true)}
              style={{ 
                height: '44px',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                border: 'none'
              }}
            >
              Create Resume
            </Button>
            <Tooltip title="Logout">
              <Button
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ 
                  height: '44px',
                  fontSize: '15px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  color: '#718096'
                }}
              />
            </Tooltip>
          </div>
        </div>

        {/* Content Section */}
        <Spin spinning={loading} tip="Loading your resumes...">
          {resumes.length === 0 ? (
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
                size="large"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                style={{ 
                  height: '44px',
                  fontSize: '15px',
                  fontWeight: '600',
                  borderRadius: '8px'
                }}
              >
                Create Your First Resume
              </Button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
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
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1a202c',
                        wordBreak: 'break-word',
                        marginBottom: '8px'
                      }}>
                        {resume.title}
                      </h3>
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
                    </div>
                    <Dropdown
                      menu={{ items: getMenuItems(resume._id) }}
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
                  </div>

                  {/* Card Footer */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(resume._id)}
                      style={{
                        flex: 1,
                        height: '40px',
                        fontWeight: '600',
                        borderRadius: '6px'
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(resume._id)}
                      style={{
                        height: '40px',
                        fontWeight: '600',
                        borderRadius: '6px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Spin>
      </div>

      {/* Create Resume Modal */}
      <Modal
        title={<span style={{ fontSize: '18px', fontWeight: '600' }}>Create New Resume</span>}
        open={isModalVisible}
        onOk={handleCreateResume}
        onCancel={() => {
          setIsModalVisible(false);
          setNewResumeName('');
        }}
        okText="Create"
        cancelText="Cancel"
        width={500}
        style={{ maxWidth: '90vw' }}
        bodyStyle={{ padding: '24px' }}
      >
        <Input
          placeholder="Enter resume name (e.g., Software Engineer 2024)"
          value={newResumeName}
          onChange={(e) => setNewResumeName(e.target.value)}
          onPressEnter={handleCreateResume}
          style={{ 
            fontSize: '14px',
            height: '40px',
            borderRadius: '6px'
          }}
          autoFocus
        />
      </Modal>
    </div>
  );
}
