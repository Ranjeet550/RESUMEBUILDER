import { Form, Input, Button, Select, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';

export default function LanguagesForm() {
  const resume = useResumeStore((state) => state.resume);
  const addLanguage = useResumeStore((state) => state.addLanguage);
  const updateLanguage = useResumeStore((state) => state.updateLanguage);
  const removeLanguage = useResumeStore((state) => state.removeLanguage);

  const languages = resume?.languages || [];

  const handleAddLanguage = () => {
    addLanguage({
      language: '',
      proficiency: 'Intermediate'
    });
  };

  const handleUpdateLanguage = (index, field, value) => {
    const updated = { ...languages[index], [field]: value };
    updateLanguage(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Languages</h3>

      {languages.map((lang, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 12 }}
          extra={
            <DeleteOutlined
              onClick={() => removeLanguage(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Form layout="vertical">
              <Form.Item label="Language">
                <Input
                  value={lang.language}
                  onChange={(e) => handleUpdateLanguage(index, 'language', e.target.value)}
                  placeholder="English, Spanish, etc."
                />
              </Form.Item>
            </Form>
            <Form layout="vertical">
              <Form.Item label="Proficiency">
                <Select
                  value={lang.proficiency}
                  onChange={(value) => handleUpdateLanguage(index, 'proficiency', value)}
                  options={[
                    { label: 'Elementary', value: 'Elementary' },
                    { label: 'Limited Working', value: 'Limited Working' },
                    { label: 'Professional Working', value: 'Professional Working' },
                    { label: 'Full Professional', value: 'Full Professional' },
                    { label: 'Native/Bilingual', value: 'Native/Bilingual' }
                  ]}
                />
              </Form.Item>
            </Form>
          </div>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddLanguage}
        style={{ marginTop: 12 }}
      >
        Add Language
      </Button>
    </div>
  );
}
