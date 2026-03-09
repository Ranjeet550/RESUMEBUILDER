import { Form, Input, Button, Space, Checkbox, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';

export default function ExperienceForm() {
  const resume = useResumeStore((state) => state.resume);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  
  const experience = resume?.experience || [];

  const handleAddExperience = () => {
    addExperience({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    });
  };

  const handleUpdateExperience = (index, field, value) => {
    const updated = { ...experience[index], [field]: value };
    updateExperience(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Work Experience</h3>
      
      {experience.map((exp, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 16 }}
          extra={
            <DeleteOutlined
              onClick={() => removeExperience(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <Form layout="vertical">
            <Form.Item label="Job Title">
              <Input
                value={exp.jobTitle}
                onChange={(e) => handleUpdateExperience(index, 'jobTitle', e.target.value)}
                placeholder="Software Engineer"
              />
            </Form.Item>

            <Form.Item label="Company">
              <Input
                value={exp.company}
                onChange={(e) => handleUpdateExperience(index, 'company', e.target.value)}
                placeholder="Company Name"
              />
            </Form.Item>

            <Form.Item label="Location">
              <Input
                value={exp.location}
                onChange={(e) => handleUpdateExperience(index, 'location', e.target.value)}
                placeholder="City, Country"
              />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item label="Start Date">
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleUpdateExperience(index, 'startDate', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="End Date">
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleUpdateExperience(index, 'endDate', e.target.value)}
                  disabled={exp.currentlyWorking}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Checkbox
                checked={exp.currentlyWorking}
                onChange={(e) => handleUpdateExperience(index, 'currentlyWorking', e.target.checked)}
              >
                Currently working here
              </Checkbox>
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                rows={3}
                value={exp.description}
                onChange={(e) => handleUpdateExperience(index, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
              />
            </Form.Item>
          </Form>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddExperience}
        style={{ marginTop: 12 }}
      >
        Add Experience
      </Button>
    </div>
  );
}
