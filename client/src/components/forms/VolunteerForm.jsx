import { Form, Input, Button, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';
import AISuggestionButton from '../AISuggestionButton';

export default function VolunteerForm() {
  const resume = useResumeStore((state) => state.resume);
  const addVolunteer = useResumeStore((state) => state.addVolunteer);
  const updateVolunteer = useResumeStore((state) => state.updateVolunteer);
  const removeVolunteer = useResumeStore((state) => state.removeVolunteer);

  const volunteer = resume?.volunteer || [];

  const handleAddVolunteer = () => {
    addVolunteer({
      organization: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleUpdateVolunteer = (index, field, value) => {
    const updated = { ...volunteer[index], [field]: value };
    updateVolunteer(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Volunteer Experience</h3>

      {volunteer.map((vol, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 16 }}
          extra={
            <DeleteOutlined
              onClick={() => removeVolunteer(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <Form layout="vertical">
            <Form.Item label="Organization">
              <Input
                value={vol.organization}
                onChange={(e) => handleUpdateVolunteer(index, 'organization', e.target.value)}
                placeholder="Organization name"
              />
            </Form.Item>

            <Form.Item label="Position">
              <Input
                value={vol.position}
                onChange={(e) => handleUpdateVolunteer(index, 'position', e.target.value)}
                placeholder="Volunteer position"
              />
            </Form.Item>

            <Form.Item label="Location">
              <Input
                value={vol.location}
                onChange={(e) => handleUpdateVolunteer(index, 'location', e.target.value)}
                placeholder="City, Country"
              />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item label="Start Date">
                <Input
                  type="month"
                  value={vol.startDate}
                  onChange={(e) => handleUpdateVolunteer(index, 'startDate', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="End Date">
                <Input
                  type="month"
                  value={vol.endDate}
                  onChange={(e) => handleUpdateVolunteer(index, 'endDate', e.target.value)}
                />
              </Form.Item>
            </div>

            <Form.Item label="Description">
              <Input.TextArea
                rows={3}
                value={vol.description}
                onChange={(e) => handleUpdateVolunteer(index, 'description', e.target.value)}
                placeholder="Describe your volunteer work..."
              />
              <AISuggestionButton
                fieldType="volunteerDescription"
                context={`${vol.position} at ${vol.organization}`}
                onSuggestion={(suggestion) => handleUpdateVolunteer(index, 'description', suggestion)}
              />
            </Form.Item>
          </Form>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddVolunteer}
        style={{ marginTop: 12 }}
      >
        Add Volunteer Experience
      </Button>
    </div>
  );
}
