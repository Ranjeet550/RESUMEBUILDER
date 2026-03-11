import React, { useState } from 'react';
import { Modal, Input, message, ConfigProvider } from 'antd';
import api from '../../api/axios';
import { useResumeStore } from '../../store/resumeStore';
import { useNavigate } from 'react-router-dom';

export default function CreateResumeModal({ visible, onClose, onSuccess }) {
  const [newResumeName, setNewResumeName] = useState('');
  const [loading, setLoading] = useState(false);
  const setResume = useResumeStore((state) => state.setResume);
  const navigate = useNavigate();

  const handleCreateResume = async () => {
    if (!newResumeName.trim()) {
      message.error('Please enter a resume name');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('resume', {
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
      setNewResumeName('');
      onClose();
      onSuccess();
      navigate(`/editor/${response.data._id}`);
    } catch (error) {
      message.error('Failed to create resume');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewResumeName('');
    onClose();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#10b981',
          borderRadius: 8,
        },
      }}
    >
      <Modal
        title={<span style={{ fontSize: '18px', fontWeight: '600' }}>Create New Resume</span>}
        open={visible}
        onOk={handleCreateResume}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
        width={500}
        style={{ maxWidth: '90vw' }}
        confirmLoading={loading}
        okButtonProps={{
          style: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            border: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          }
        }}
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
          disabled={loading}
        />
      </Modal>
    </ConfigProvider>
  );
}
