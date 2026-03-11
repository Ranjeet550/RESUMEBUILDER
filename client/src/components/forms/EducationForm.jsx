import { Form, Input, Button, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';
import AISuggestionButton from '../../pages/resume/AISuggestionButton';

export default function EducationForm() {
  const resume = useResumeStore((state) => state.resume);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  
  const education = resume?.education || [];

  const handleAddEducation = () => {
    addEducation({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = { ...education[index], [field]: value };
    updateEducation(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Education</h3>
      
      {education.map((edu, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 16 }}
          extra={
            <DeleteOutlined
              onClick={() => removeEducation(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <Form layout="vertical">
            <Form.Item label="School/University">
              <Input
                value={edu.school}
                onChange={(e) => handleUpdateEducation(index, 'school', e.target.value)}
                placeholder="University Name"
              />
            </Form.Item>

            <Form.Item label="Degree">
              <Input
                value={edu.degree}
                onChange={(e) => handleUpdateEducation(index, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </Form.Item>

            <Form.Item label="Field of Study">
              <Input
                value={edu.field}
                onChange={(e) => handleUpdateEducation(index, 'field', e.target.value)}
                placeholder="Computer Science"
              />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item label="Start Date">
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleUpdateEducation(index, 'startDate', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="End Date">
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleUpdateEducation(index, 'endDate', e.target.value)}
                />
              </Form.Item>
            </div>

            <Form.Item label="Description">
              <Input.TextArea
                rows={2}
                value={edu.description}
                onChange={(e) => handleUpdateEducation(index, 'description', e.target.value)}
                placeholder="Additional details about your education..."
              />
              <AISuggestionButton
                fieldType="educationDescription"
                context={`${edu.degree} in ${edu.field} from ${edu.school}`}
                onSuggestion={(suggestion) => handleUpdateEducation(index, 'description', suggestion)}
              />
            </Form.Item>
          </Form>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddEducation}
        style={{ marginTop: 12 }}
      >
        Add Education
      </Button>
    </div>
  );
}
