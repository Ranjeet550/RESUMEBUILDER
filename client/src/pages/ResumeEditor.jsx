import { useState, useEffect } from 'react';
import { Layout, Spin, message, Button, Tabs, ConfigProvider, Drawer } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, DownloadOutlined, BgColorsOutlined } from '@ant-design/icons';
import html2pdf from 'html2pdf.js';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useResumeStore } from '../store/resumeStore';
import { getTheme } from '../config/theme';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import LanguagesForm from '../components/forms/LanguagesForm';
import VolunteerForm from '../components/forms/VolunteerForm';
import AwardsForm from '../components/forms/AwardsForm';
import PublicationsForm from '../components/forms/PublicationsForm';
import ResumePreview from '../components/preview/ResumePreview';
import ThemeSwitcherVisual from '../components/ThemeSwitcherVisual';
import TemplateSwitcherVisual from '../components/TemplateSwitcherVisual';
import SectionReorderer from '../components/SectionReorderer';

const { Content } = Layout;

export default function ResumeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const resume = useResumeStore((state) => state.resume);
  const setResume = useResumeStore((state) => state.setResume);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  useEffect(() => {
    if (resume.theme) {
      setCurrentTheme(resume.theme);
    }
    if (resume.template) {
      setCurrentTemplate(resume.template);
    }
  }, [resume]);

  const fetchResume = async () => {
    setLoading(true);
    try {
      const response = await api.get(`resume/${id}`);
      setResume(response.data);
    } catch (error) {
      message.error('Failed to load resume');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedResume = {
        ...resume,
        theme: currentTheme,
        template: currentTemplate,
      };
      if (id) {
        await api.put(`resume/${id}`, updatedResume);
        message.success('Resume saved successfully');
      } else {
        const response = await api.post('resume', updatedResume);
        message.success('Resume created successfully');
        navigate(`/editor/${response.data._id}`);
      }
    } catch (error) {
      message.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    setResume({ ...resume, theme });
  };

  const handleTemplateChange = (template) => {
    setCurrentTemplate(template);
    setResume({ ...resume, template });
  };

  const handleDownload = () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      message.error('Resume preview not found');
      return;
    }

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${resume.title || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    message.loading({ content: 'Generating PDF...', duration: 0 });
    
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        message.destroy();
        message.success('Resume downloaded successfully');
      })
      .catch((error) => {
        message.destroy();
        message.error('Failed to generate PDF');
        console.error('PDF generation error:', error);
      });
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
  }

  const currentThemeConfig = getTheme(currentTheme);

  return (
    <ConfigProvider theme={currentThemeConfig}>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{
          background: 'white',
          padding: 'clamp(10px, 2.5vw, 16px) clamp(12px, 3vw, 24px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          flexWrap: 'wrap',
          gap: 'clamp(8px, 2vw, 12px)',
          minHeight: 'auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(6px, 1.5vw, 12px)',
            minWidth: 0,
            flex: '1 1 auto'
          }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/dashboard')}
              size="small"
              style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}
            >
              Back
            </Button>
            <h2 style={{ 
              margin: 0, 
              fontSize: 'clamp(14px, 3.5vw, 20px)', 
              color: currentThemeConfig.token.colorPrimary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>{resume.title}</h2>
          </div>
          <div style={{
            display: 'flex',
            gap: 'clamp(4px, 1vw, 8px)',
            flexWrap: 'wrap',
            justifyContent: 'flex-end'
          }}>
            <Button
              icon={<BgColorsOutlined />}
              onClick={() => setSettingsOpen(true)}
              size="small"
              style={{ fontSize: 'clamp(11px, 1.8vw, 13px)' }}
            >
              Customize
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              size="small"
              style={{ fontSize: 'clamp(11px, 1.8vw, 13px)' }}
            >
              Download PDF
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={saving}
              onClick={handleSave}
              size="small"
              style={{ fontSize: 'clamp(11px, 1.8vw, 13px)' }}
            >
              Save
            </Button>
          </div>
        </div>

        <Layout.Content style={{ 
          padding: 'clamp(12px, 3vw, 24px)',
          overflow: 'auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 'clamp(12px, 3vw, 24px)',
            width: '100%'
          }}>
            <div style={{
              background: 'white',
              padding: 'clamp(12px, 3vw, 24px)',
              borderRadius: 8,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
              maxHeight: isMobile ? 'auto' : 'calc(100vh - 120px)',
              overflowY: 'auto',
              minWidth: 0
            }}>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: '1',
                    label: 'Personal',
                    children: <PersonalInfoForm />
                  },
                  {
                    key: '2',
                    label: 'Experience',
                    children: <ExperienceForm />
                  },
                  {
                    key: '3',
                    label: 'Education',
                    children: <EducationForm />
                  },
                  {
                    key: '4',
                    label: 'Skills',
                    children: <SkillsForm />
                  },
                  {
                    key: '5',
                    label: 'Projects',
                    children: <ProjectsForm />
                  },
                  {
                    key: '6',
                    label: 'Certifications',
                    children: <CertificationsForm />
                  },
                  {
                    key: '7',
                    label: 'Languages',
                    children: <LanguagesForm />
                  },
                  {
                    key: '8',
                    label: 'Volunteer',
                    children: <VolunteerForm />
                  },
                  {
                    key: '9',
                    label: 'Awards',
                    children: <AwardsForm />
                  },
                  {
                    key: '10',
                    label: 'Publications',
                    children: <PublicationsForm />
                  }
                ]}
                size={isMobile ? 'small' : 'middle'}
              />
            </div>
            <div style={{
              background: 'white',
              padding: 'clamp(12px, 3vw, 24px)',
              borderRadius: 8,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
              maxHeight: isMobile ? 'auto' : 'calc(100vh - 120px)',
              overflowY: 'auto',
              minWidth: 0,
              display: isMobile ? 'none' : 'block'
            }}>
              <ResumePreview template={currentTemplate} theme={currentTheme} />
            </div>
          </div>
        </Layout.Content>

        <Drawer
          title="Customize Resume"
          placement="right"
          onClose={() => setSettingsOpen(false)}
          open={settingsOpen}
          width={isMobile ? '100%' : 'clamp(300px, 50vw, 500px)'}
          styles={{ body: { padding: 'clamp(12px, 3vw, 24px)', overflow: 'auto', maxHeight: 'calc(100vh - 100px)' } }}
        >
          <SectionReorderer />
          <div style={{ marginTop: 32, borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
            <h4 style={{ marginBottom: 16 }}>Theme & Template</h4>
            <ThemeSwitcherVisual currentTheme={currentTheme} onThemeChange={handleThemeChange} />
            <TemplateSwitcherVisual currentTemplate={currentTemplate} onTemplateChange={handleTemplateChange} />
          </div>
        </Drawer>
      </Layout>
    </ConfigProvider>
  );
}
