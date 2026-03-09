import { useResumeStore } from '../../store/resumeStore';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, LinkOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import { themes } from '../../config/theme';

export default function ResumePreview({ template, theme: themeName }) {
  const resume = useResumeStore((state) => state.resume);
  const { personalInfo, experience, education, skills, projects, certifications, languages, volunteer, awards, publications } = resume;

  // Get theme colors
  const themeConfig = themes[themeName] || themes.blue;
  const primaryColor = themeConfig.token.colorPrimary;
  const bgColor = themeConfig.token.colorBgBase;
  const textColor = themeConfig.token.colorTextBase;

  // Template-specific styles
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          container: { padding: '40px', backgroundColor: bgColor, fontFamily: 'Arial, sans-serif', fontSize: '11px', color: textColor },
          header: { textAlign: 'center', marginBottom: '24px', borderBottom: `3px solid ${primaryColor}`, paddingBottom: '16px' },
          sectionTitle: { fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: '8px' },
          entryTitle: { fontSize: '12px', fontWeight: 'bold', color: textColor, margin: '0 0 4px 0' },
          entrySubtitle: { fontSize: '11px', color: '#666', margin: '0 0 4px 0', fontStyle: 'italic' },
          entryText: { fontSize: '11px', color: '#555', margin: '0', lineHeight: '1.5' }
        };
      case 'classic':
        return {
          container: { padding: '50px', backgroundColor: bgColor, fontFamily: 'Georgia, serif', fontSize: '11px', color: textColor },
          header: { textAlign: 'center', marginBottom: '30px', borderBottom: `1px solid ${textColor}`, paddingBottom: '20px' },
          sectionTitle: { fontSize: '13px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', color: textColor, borderBottom: `1px solid ${textColor}`, paddingBottom: '8px' },
          entryTitle: { fontSize: '12px', fontWeight: 'bold', color: textColor, margin: '0 0 4px 0' },
          entrySubtitle: { fontSize: '11px', color: '#555', margin: '0 0 4px 0' },
          entryText: { fontSize: '11px', color: '#555', margin: '0', lineHeight: '1.6' }
        };
      case 'minimal':
        return {
          container: { padding: '30px', backgroundColor: bgColor, fontFamily: 'Helvetica, sans-serif', fontSize: '10px', color: textColor },
          header: { textAlign: 'left', marginBottom: '20px', paddingBottom: '12px' },
          sectionTitle: { fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', color: primaryColor, paddingBottom: '6px' },
          entryTitle: { fontSize: '11px', fontWeight: 'bold', color: textColor, margin: '0 0 3px 0' },
          entrySubtitle: { fontSize: '10px', color: '#666', margin: '0 0 3px 0' },
          entryText: { fontSize: '10px', color: '#555', margin: '0', lineHeight: '1.4' }
        };
      default:
        return {
          container: { padding: '40px', backgroundColor: bgColor, fontFamily: 'Arial, sans-serif', fontSize: '11px', color: textColor },
          header: { textAlign: 'center', marginBottom: '24px', borderBottom: `3px solid ${primaryColor}`, paddingBottom: '16px' },
          sectionTitle: { fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: '8px' },
          entryTitle: { fontSize: '12px', fontWeight: 'bold', color: textColor, margin: '0 0 4px 0' },
          entrySubtitle: { fontSize: '11px', color: '#666', margin: '0 0 4px 0', fontStyle: 'italic' },
          entryText: { fontSize: '11px', color: '#555', margin: '0', lineHeight: '1.5' }
        };
    }
  };

  const styles = getTemplateStyles();
  const sectionStyle = { marginBottom: '24px' };

  const contactInfo = [
    { icon: <MailOutlined />, value: personalInfo.email, label: 'Email' },
    { icon: <PhoneOutlined />, value: personalInfo.phone, label: 'Phone' },
    { icon: <EnvironmentOutlined />, value: personalInfo.location, label: 'Location' },
    { icon: <LinkOutlined />, value: personalInfo.website, label: 'Website' },
    { icon: <LinkedinOutlined />, value: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <GithubOutlined />, value: personalInfo.github, label: 'GitHub' }
  ];

  return (
    <div id="resume-preview" style={styles.container}>
      {/* Header with Name */}
      <div style={styles.header}>
        <h1 style={{ margin: '0 0 12px 0', fontSize: '28px', fontWeight: 'bold', color: textColor }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        {/* Contact Information with Icons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '12px' }}>
          {contactInfo.map((item, index) => (
            item.value && (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: primaryColor, fontSize: '14px' }}>{item.icon}</span>
                <span>{item.value}</span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.entryText}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Work Experience</h2>
          {experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <p style={styles.entryTitle}>{exp.jobTitle} {exp.company && `at ${exp.company}`}</p>
                <p style={styles.entrySubtitle}>{exp.location} {exp.startDate && `| ${exp.startDate}`} {exp.endDate && `- ${exp.endDate}`}</p>
                {exp.description && <p style={styles.entryText}>{exp.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && education.some(edu => edu.school || edu.degree || edu.field) && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map((edu, index) => (
            (edu.school || edu.degree || edu.field) && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <p style={styles.entryTitle}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                <p style={styles.entrySubtitle}>{edu.school} {edu.startDate && `| ${edu.startDate}`} {edu.endDate && `- ${edu.endDate}`}</p>
                {edu.description && <p style={styles.entryText}>{edu.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          {skills.map((skillGroup, index) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              {skillGroup.category && <p style={{ ...styles.entryTitle, marginBottom: '6px' }}>{skillGroup.category}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Array.isArray(skillGroup.skills) && skillGroup.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: textColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && projects.some(p => p.name) && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {projects.map((project, index) => (
            project.name && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <p style={styles.entryTitle}>{project.name}</p>
                {project.link && <p style={styles.entrySubtitle}>{project.link}</p>}
                {project.description && <p style={styles.entryText}>{project.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && certifications.some(c => c.name) && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Certifications</h2>
          {certifications.map((cert, index) => (
            cert.name && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <p style={styles.entryTitle}>{cert.name}</p>
                <p style={styles.entrySubtitle}>{cert.issuer} {cert.issueDate && `| ${cert.issueDate}`}</p>
              </div>
            )
          ))}
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && languages.some(l => l.name) && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {languages.map((lang, index) => (
              lang.name && (
                <span key={index} style={{ fontSize: '11px', color: textColor }}>
                  {lang.name} {lang.proficiency && `- ${lang.proficiency}`}
                </span>
              )
            ))}
          </div>
        </div>
      )}

      {/* Volunteer */}
      {volunteer && volunteer.length > 0 && volunteer.some(v => v.position || v.organization) && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Volunteer Experience</h2>
          {volunteer.map((vol, index) => (
            (vol.position || vol.organization) && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <p style={styles.entryTitle}>{vol.position} {vol.organization && `at ${vol.organization}`}</p>
                <p style={styles.entrySubtitle}>{vol.startDate} {vol.endDate && `- ${vol.endDate}`}</p>
                {vol.description && <p style={styles.entryText}>{vol.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Awards */}
      {awards && awards.length > 0 && awards.some(a => a.name) && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Awards</h2>
          {awards.map((award, index) => (
            award.name && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <p style={styles.entryTitle}>{award.name}</p>
                <p style={styles.entrySubtitle}>{award.issuer} {award.date && `| ${award.date}`}</p>
                {award.description && <p style={styles.entryText}>{award.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Publications */}
      {publications && publications.length > 0 && publications.some(p => p.title) && (
        <div style={sectionStyle}>
          <h2 style={styles.sectionTitle}>Publications</h2>
          {publications.map((pub, index) => (
            pub.title && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <p style={styles.entryTitle}>{pub.title}</p>
                <p style={styles.entrySubtitle}>{pub.publisher} {pub.publicationDate && `| ${pub.publicationDate}`}</p>
                {pub.description && <p style={styles.entryText}>{pub.description}</p>}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
