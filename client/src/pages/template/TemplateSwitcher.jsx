import { Select, Space } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const templates = {
  modern: { name: 'Modern', description: 'Clean and contemporary design' },
  classic: { name: 'Classic', description: 'Traditional professional layout' },
  minimal: { name: 'Minimal', description: 'Simple and elegant' },
  creative: { name: 'Creative', description: 'Bold and eye-catching' },
  academic: { name: 'Academic', description: 'Formal and detailed' },
};

export default function TemplateSwitcher({ currentTemplate, onTemplateChange }) {
  const templateOptions = Object.entries(templates).map(([key, value]) => ({
    label: `${value.name} - ${value.description}`,
    value: key,
  }));

  return (
    <Space>
      <FileTextOutlined style={{ fontSize: 16 }} />
      <Select
        value={currentTemplate}
        onChange={onTemplateChange}
        options={templateOptions}
        style={{ width: 280 }}
        size="small"
      />
    </Space>
  );
}
