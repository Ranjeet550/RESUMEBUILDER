import { Form, Input, Button, Card, Tag } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';

export default function ProjectsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const removeProject = useResumeStore((state) => state.removeProject);

  const projects = resume?.projects || [];

  const handleAddProject = () => {
    addProject({
      title: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = { ...projects[index], [field]: value };
    updateProject(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Projects</h3>

      {projects.map((project, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 16 }}
          extra={
            <DeleteOutlined
              onClick={() => removeProject(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <Form layout="vertical">
            <Form.Item label="Project Title">
              <Input
                value={project.title}
                onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                placeholder="Project name"
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                rows={3}
                value={project.description}
                onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                placeholder="Describe your project..."
              />
            </Form.Item>

            <Form.Item label="Technologies (comma separated)">
              <Input
                value={project.technologies?.join(', ') || ''}
                onChange={(e) => handleUpdateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                placeholder="React, Node.js, MongoDB"
              />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item label="Project Link">
                <Input
                  value={project.link}
                  onChange={(e) => handleUpdateProject(index, 'link', e.target.value)}
                  placeholder="https://example.com"
                />
              </Form.Item>

              <Form.Item label="GitHub Link">
                <Input
                  value={project.github}
                  onChange={(e) => handleUpdateProject(index, 'github', e.target.value)}
                  placeholder="https://github.com/..."
                />
              </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item label="Start Date">
                <Input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => handleUpdateProject(index, 'startDate', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="End Date">
                <Input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => handleUpdateProject(index, 'endDate', e.target.value)}
                />
              </Form.Item>
            </div>
          </Form>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddProject}
        style={{ marginTop: 12 }}
      >
        Add Project
      </Button>
    </div>
  );
}
