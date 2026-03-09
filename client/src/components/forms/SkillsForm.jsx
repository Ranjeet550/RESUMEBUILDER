import { Form, Input, Button, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';

export default function SkillsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  
  const skills = resume?.skills || [];

  const handleAddSkill = () => {
    addSkill({
      category: '',
      skills: []
    });
  };

  const handleUpdateSkill = (index, field, value) => {
    const updated = { ...skills[index], [field]: value };
    updateSkill(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Skills</h3>
      
      {skills.map((skill, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 12 }}
          extra={
            <DeleteOutlined
              onClick={() => removeSkill(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <Form layout="vertical">
            <Form.Item label="Skill Category">
              <Input
                value={skill.category}
                onChange={(e) => handleUpdateSkill(index, 'category', e.target.value)}
                placeholder="e.g., Programming Languages, Frameworks, Tools"
              />
            </Form.Item>
            <Form.Item label="Skills (comma separated)">
              <Input.TextArea
                rows={2}
                value={skill.skills?.join(', ') || ''}
                onChange={(e) => handleUpdateSkill(index, 'skills', e.target.value.split(',').map(s => s.trim()))}
                placeholder="JavaScript, React, Node.js"
              />
            </Form.Item>
          </Form>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddSkill}
        style={{ marginTop: 12 }}
      >
        Add Skill Category
      </Button>
    </div>
  );
}
