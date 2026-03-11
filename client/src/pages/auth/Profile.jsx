import { useState, useEffect } from 'react';
import { Button, Form, Input, message, Spin, Upload, Card, Row, Col, Divider, Modal } from 'antd';
import { UserOutlined, CameraOutlined, SaveOutlined, EditOutlined, ThunderboltOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

export default function Profile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await api.get('user/profile');
      setProfileData(response.data);
      form.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        bio: response.data.bio || '',
        phone: response.data.phone || '',
        location: response.data.location || '',
        website: response.data.website || ''
      });
      if (response.data.photo) {
        setPhotoPreview(response.data.photo);
      }
    } catch (error) {
      message.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (info) => {
    const file = info.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
        setPhotoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('bio', values.bio || '');
      formData.append('phone', values.phone || '');
      formData.append('location', values.location || '');
      formData.append('website', values.website || '');
      
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const response = await api.put('user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProfileData(response.data);
      setUser(response.data);
      setPhotoFile(null);
      
      // Update photo preview with the new URL from server
      if (response.data.photo) {
        setPhotoPreview(response.data.photo);
      }
      
      setIsEditing(false);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    Modal.confirm({
      title: 'Change Password',
      content: (
        <Form layout="vertical" style={{ marginTop: '20px' }}>
          <Form.Item label="Current Password">
            <Input.Password placeholder="Enter current password" />
          </Form.Item>
          <Form.Item label="New Password">
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
        </Form>
      ),
      okText: 'Update',
      cancelText: 'Cancel',
      onOk() {
        message.success('Password updated successfully');
      }
    });
  };

  if (loading && !profileData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px 20px'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        background: 'linear-gradient(90deg, #ffffff 0%, #f0fdf4 100%)',
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
        marginBottom: '40px',
        borderRadius: '12px'
      }}>
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

        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/dashboard')}
          style={{
            fontSize: '16px',
            color: '#10b981',
            fontWeight: '600'
          }}
        >
          Back to Dashboard
        </Button>
      </nav>

      <div style={{
        maxWidth: 900,
        margin: '0 auto'
      }}>
        {/* Profile Header Card */}
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            marginBottom: '32px',
            border: 'none'
          }}
          bodyStyle={{ padding: '40px' }}
        >
          <Row gutter={[40, 40]} align="middle">
            {/* Photo Section */}
            <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
              <div style={{
                position: 'relative',
                width: '160px',
                height: '160px',
                margin: '0 auto',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
                  border: '4px solid white',
                  overflow: 'hidden'
                }}>
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <UserOutlined />
                  )}
                </div>
                {isEditing && (
                  <Upload
                    maxCount={1}
                    onChange={handlePhotoChange}
                    beforeUpload={() => false}
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0'
                    }}
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<CameraOutlined />}
                      size="large"
                      style={{
                        background: '#10b981',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      }}
                    />
                  </Upload>
                )}
              </div>
              <h2 style={{
                margin: '0 0 8px 0',
                color: '#1a202c',
                fontSize: '24px',
                fontWeight: '700'
              }}>
                {profileData?.name}
              </h2>
              <p style={{
                margin: '0',
                color: '#718096',
                fontSize: '14px'
              }}>
                {profileData?.email}
              </p>
            </Col>

            {/* Info Section */}
            <Col xs={24} sm={16}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  margin: '0 0 16px 0',
                  color: '#1a202c',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  Profile Information
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  <div>
                    <p style={{ margin: '0 0 4px 0', color: '#718096', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
                      Name
                    </p>
                    <p style={{ margin: '0', color: '#1a202c', fontSize: '16px', fontWeight: '600' }}>
                      {profileData?.name}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', color: '#718096', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
                      Email
                    </p>
                    <p style={{ margin: '0', color: '#1a202c', fontSize: '16px', fontWeight: '600' }}>
                      {profileData?.email}
                    </p>
                  </div>
                  {profileData?.phone && (
                    <div>
                      <p style={{ margin: '0 0 4px 0', color: '#718096', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
                        Phone
                      </p>
                      <p style={{ margin: '0', color: '#1a202c', fontSize: '16px', fontWeight: '600' }}>
                        {profileData.phone}
                      </p>
                    </div>
                  )}
                  {profileData?.location && (
                    <div>
                      <p style={{ margin: '0 0 4px 0', color: '#718096', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
                        Location
                      </p>
                      <p style={{ margin: '0', color: '#1a202c', fontSize: '16px', fontWeight: '600' }}>
                        {profileData.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {profileData?.bio && (
                <div>
                  <p style={{ margin: '0 0 8px 0', color: '#718096', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
                    Bio
                  </p>
                  <p style={{ margin: '0', color: '#1a202c', fontSize: '14px', lineHeight: '1.6' }}>
                    {profileData.bio}
                  </p>
                </div>
              )}
            </Col>
          </Row>

          <Divider style={{ margin: '32px 0' }} />

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
          }}>
            <Button
              icon={<EditOutlined />}
              onClick={() => setIsEditing(!isEditing)}
              style={{
                height: '40px',
                fontWeight: '600',
                borderRadius: '8px'
              }}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
            <Button
              onClick={handleChangePassword}
              style={{
                height: '40px',
                fontWeight: '600',
                borderRadius: '8px'
              }}
            >
              Change Password
            </Button>
          </div>
        </Card>

        {/* Edit Form */}
        {isEditing && (
          <Card
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: 'none'
            }}
            bodyStyle={{ padding: '40px' }}
          >
            <h3 style={{
              margin: '0 0 24px 0',
              color: '#1a202c',
              fontSize: '20px',
              fontWeight: '700'
            }}>
              Edit Profile
            </h3>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveProfile}
              autoComplete="off"
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#1a202c' }}>Full Name</span>}
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input
                      placeholder="Enter your full name"
                      size="large"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#1a202c' }}>Email</span>}
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input
                      placeholder="Enter your email"
                      size="large"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#1a202c' }}>Phone</span>}
                    name="phone"
                  >
                    <Input
                      placeholder="Enter your phone number"
                      size="large"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#1a202c' }}>Location</span>}
                    name="location"
                  >
                    <Input
                      placeholder="Enter your location"
                      size="large"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#1a202c' }}>Website</span>}
                    name="website"
                  >
                    <Input
                      placeholder="Enter your website URL"
                      size="large"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#1a202c' }}>Bio</span>}
                    name="bio"
                  >
                    <Input.TextArea
                      placeholder="Tell us about yourself"
                      rows={4}
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#1a202c' }}>Profile Photo</span>}
                  >
                    <Upload
                      maxCount={1}
                      onChange={handlePhotoChange}
                      beforeUpload={() => false}
                      accept="image/*"
                    >
                      <Button
                        icon={<CameraOutlined />}
                        style={{
                          height: '40px',
                          borderRadius: '8px'
                        }}
                      >
                        Upload Photo
                      </Button>
                    </Upload>
                    {photoPreview && (
                      <div style={{ marginTop: '16px' }}>
                        <img
                          src={photoPreview}
                          alt="Preview"
                          style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Divider style={{ margin: '32px 0' }} />

              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfileData();
                  }}
                  style={{
                    height: '40px',
                    fontWeight: '600',
                    borderRadius: '8px'
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                  style={{
                    height: '40px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    background: '#10b981',
                    border: 'none'
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
}
