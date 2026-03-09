import { Form, Input, Button, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';

export default function PublicationsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addPublication = useResumeStore((state) => state.addPublication);
  const updatePublication = useResumeStore((state) => state.updatePublication);
  const removePublication = useResumeStore((state) => state.removePublication);

  const publications = resume?.publications || [];

  const handleAddPublication = () => {
    addPublication({
      title: '',
      publisher: '',
      date: '',
      link: '',
      description: ''
    });
  };

  const handleUpdatePublication = (index, field, value) => {
    const updated = { ...publications[index], [field]: value };
    updatePublication(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Publications</h3>

      {publications.map((pub, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 16 }}
          extra={
            <DeleteOutlined
              onClick={() => removePublication(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <Form layout="vertical">
            <Form.Item label="Publication Title">
              <Input
                value={pub.title}
                onChange={(e) => handleUpdatePublication(index, 'title', e.target.value)}
                placeholder="Article or paper title"
              />
            </Form.Item>

            <Form.Item label="Publisher">
              <Input
                value={pub.publisher}
                onChange={(e) => handleUpdatePublication(index, 'publisher', e.target.value)}
                placeholder="Publisher name"
              />
            </Form.Item>

            <Form.Item label="Publication Date">
              <Input
                type="month"
                value={pub.date}
                onChange={(e) => handleUpdatePublication(index, 'date', e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Publication Link">
              <Input
                value={pub.link}
                onChange={(e) => handleUpdatePublication(index, 'link', e.target.value)}
                placeholder="https://..."
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                rows={2}
                value={pub.description}
                onChange={(e) => handleUpdatePublication(index, 'description', e.target.value)}
                placeholder="Describe the publication..."
              />
            </Form.Item>
          </Form>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddPublication}
        style={{ marginTop: 12 }}
      >
        Add Publication
      </Button>
    </div>
  );
}
