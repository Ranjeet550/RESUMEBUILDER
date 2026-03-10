import { Form, Input } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, LinkOutlined, LinkedinOutlined, GithubOutlined, FileTextOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import AISuggestionButton from '../AISuggestionButton';

export default function PersonalInfoForm() {
  const resume = useResumeStore((state) => state.resume);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);
  const [form] = Form.useForm();
  const [summary, setSummary] = useState('');

  const personalInfo = resume?.personalInfo || {};

  useEffect(() => {
    setSummary(personalInfo.summary || '');
    form.setFieldsValue(personalInfo);
  }, [personalInfo, form]);

  const handleChange = (changedValues) => {
    if (changedValues.summary !== undefined) {
      setSummary(changedValues.summary);
    }
    updatePersonalInfo({
      ...personalInfo,
      ...changedValues
    });
  };

  const handleSummaryUpdate = (suggestion) => {
    setSummary(suggestion);
    const updatedInfo = {
      ...personalInfo,
      summary: suggestion
    };
    updatePersonalInfo(updatedInfo);
    form.setFieldsValue({ summary: suggestion });
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Personal Information</h3>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleChange}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<><MailOutlined style={{ marginRight: 8 }} />Email</>}
          rules={[{ type: 'email' }]}
        >
          <Input placeholder="john@example.com" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<><PhoneOutlined style={{ marginRight: 8 }} />Phone</>}
        >
          <Input placeholder="+1 (555) 000-0000" prefix={<PhoneOutlined />} />
        </Form.Item>

        <Form.Item
          name="location"
          label={<><EnvironmentOutlined style={{ marginRight: 8 }} />Location</>}
        >
          <Input placeholder="City, Country" prefix={<EnvironmentOutlined />} />
        </Form.Item>

        <Form.Item
          name="website"
          label={<><LinkOutlined style={{ marginRight: 8 }} />Website</>}
        >
          <Input placeholder="https://yourwebsite.com" prefix={<LinkOutlined />} />
        </Form.Item>

        <Form.Item
          name="linkedin"
          label={<><LinkedinOutlined style={{ marginRight: 8 }} />LinkedIn Profile</>}
        >
          <Input placeholder="https://linkedin.com/in/yourprofile" prefix={<LinkedinOutlined />} />
        </Form.Item>

        <Form.Item
          name="github"
          label={<><GithubOutlined style={{ marginRight: 8 }} />GitHub Profile</>}
        >
          <Input placeholder="https://github.com/yourprofile" prefix={<GithubOutlined />} />
        </Form.Item>

        <Form.Item
          name="summary"
          label={<><FileTextOutlined style={{ marginRight: 8 }} />Professional Summary</>}
        >
          <Input.TextArea
            rows={4}
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
              handleChange({ summary: e.target.value });
            }}
            placeholder="Brief summary about yourself and your career objectives..."
          />
          <AISuggestionButton
            fieldType="professionalSummary"
            context={`${personalInfo.fullName || 'Professional'} with experience and skills`}
            onSuggestion={handleSummaryUpdate}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
