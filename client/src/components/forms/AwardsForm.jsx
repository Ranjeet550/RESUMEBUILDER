import { Form, Input, Button, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';

export default function AwardsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addAward = useResumeStore((state) => state.addAward);
  const updateAward = useResumeStore((state) => state.updateAward);
  const removeAward = useResumeStore((state) => state.removeAward);

  const awards = resume?.awards || [];

  const handleAddAward = () => {
    addAward({
      title: '',
      issuer: '',
      date: '',
      description: ''
    });
  };

  const handleUpdateAward = (index, field, value) => {
    const updated = { ...awards[index], [field]: value };
    updateAward(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Awards & Recognition</h3>

      {awards.map((award, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 16 }}
          extra={
            <DeleteOutlined
              onClick={() => removeAward(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <Form layout="vertical">
            <Form.Item label="Award Title">
              <Input
                value={award.title}
                onChange={(e) => handleUpdateAward(index, 'title', e.target.value)}
                placeholder="Award name"
              />
            </Form.Item>

            <Form.Item label="Issuing Organization">
              <Input
                value={award.issuer}
                onChange={(e) => handleUpdateAward(index, 'issuer', e.target.value)}
                placeholder="Organization"
              />
            </Form.Item>

            <Form.Item label="Date">
              <Input
                type="month"
                value={award.date}
                onChange={(e) => handleUpdateAward(index, 'date', e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                rows={2}
                value={award.description}
                onChange={(e) => handleUpdateAward(index, 'description', e.target.value)}
                placeholder="Describe the award..."
              />
            </Form.Item>
          </Form>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddAward}
        style={{ marginTop: 12 }}
      >
        Add Award
      </Button>
    </div>
  );
}
