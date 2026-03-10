import { Form, Input, Button, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResumeStore } from '../../store/resumeStore';
import AISuggestionButton from '../AISuggestionButton';

export default function CertificationsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addCertification = useResumeStore((state) => state.addCertification);
  const updateCertification = useResumeStore((state) => state.updateCertification);
  const removeCertification = useResumeStore((state) => state.removeCertification);

  const certifications = resume?.certifications || [];

  const handleAddCertification = () => {
    addCertification({
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      description: ''
    });
  };

  const handleUpdateCertification = (index, field, value) => {
    const updated = { ...certifications[index], [field]: value };
    updateCertification(index, updated);
  };

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f0f0f0' }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>Certifications</h3>

      {certifications.map((cert, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 16 }}
          extra={
            <DeleteOutlined
              onClick={() => removeCertification(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          }
        >
          <Form layout="vertical">
            <Form.Item label="Certification Name">
              <Input
                value={cert.name}
                onChange={(e) => handleUpdateCertification(index, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </Form.Item>

            <Form.Item label="Issuing Organization">
              <Input
                value={cert.issuer}
                onChange={(e) => handleUpdateCertification(index, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
              />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item label="Issue Date">
                <Input
                  type="month"
                  value={cert.issueDate}
                  onChange={(e) => handleUpdateCertification(index, 'issueDate', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Expiry Date">
                <Input
                  type="month"
                  value={cert.expiryDate}
                  onChange={(e) => handleUpdateCertification(index, 'expiryDate', e.target.value)}
                />
              </Form.Item>
            </div>

            <Form.Item label="Credential ID">
              <Input
                value={cert.credentialId}
                onChange={(e) => handleUpdateCertification(index, 'credentialId', e.target.value)}
                placeholder="Credential ID"
              />
            </Form.Item>

            <Form.Item label="Credential URL">
              <Input
                value={cert.credentialUrl}
                onChange={(e) => handleUpdateCertification(index, 'credentialUrl', e.target.value)}
                placeholder="https://..."
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                rows={2}
                value={cert.description}
                onChange={(e) => handleUpdateCertification(index, 'description', e.target.value)}
                placeholder="Describe the certification and its relevance..."
              />
              <AISuggestionButton
                fieldType="certificationDescription"
                context={`${cert.name} from ${cert.issuer}`}
                onSuggestion={(suggestion) => handleUpdateCertification(index, 'description', suggestion)}
              />
            </Form.Item>
          </Form>
        </Card>
      ))}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddCertification}
        style={{ marginTop: 12 }}
      >
        Add Certification
      </Button>
    </div>
  );
}
