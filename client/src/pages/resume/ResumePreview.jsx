import { useResumeStore } from '../../store/resumeStore';
import { themes } from '../../config/theme';

function ResumePreview({ template, theme: themeName }) {
  const resume = useResumeStore((state) => state.resume);
  
  // Debug: log resume data
  console.log('ResumePreview - Resume data:', resume);

  // Map theme config to color palette for preview
  const getThemeColors = (name) => {
    const themeConfig = themes[name] || themes.blue;
    const primary = themeConfig.token.colorPrimary;
    const colorArray = themeConfig.colors;
    
    // Create darker accent color from primary
    const accentColor = themeConfig.token.colorPrimary;
    
    return {
      primary,
      secondary: colorArray[1] || '#f0f0f0',
      accent: accentColor,
    };
  };

  const colors = getThemeColors(themeName);
  
  // Debug: log to verify colors are being set
  console.log('ResumePreview - Theme:', themeName, 'Colors:', colors);

  const renderModernTemplate = () => {
    // Show sample data if resume is empty
    const displayResume = resume && (resume.experience?.length > 0 || resume.education?.length > 0 || resume.skills?.length > 0) 
      ? resume 
      : {
          personalInfo: { fullName: 'Sample Name', email: 'email@example.com', phone: '(555) 123-4567', location: 'City, State' },
          experience: [{ jobTitle: 'Job Title', company: 'Company Name', startDate: '2020', endDate: '2023', description: 'Job description' }],
          education: [{ degree: 'Bachelor', field: 'Computer Science', school: 'University Name', startDate: '2016', endDate: '2020' }],
          skills: [{ category: 'Languages', skills: ['JavaScript', 'Python'] }]
        };

    return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      lineHeight: 1.6,
      color: '#2c3e50',
      padding: '40px',
      backgroundColor: '#fff',
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      boxSizing: 'border-box',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflow: 'visible',
    }}>
      {/* Header */}
      <div style={{ borderBottom: `4px solid ${colors.primary}`, paddingBottom: '20px', marginBottom: '25px' }}>
        <h1 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '32px', fontWeight: 700 }}>
          {displayResume.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '13px', color: '#555', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {displayResume.personalInfo?.email && <span>{displayResume.personalInfo.email}</span>}
          {displayResume.personalInfo?.phone && <span>•</span>}
          {displayResume.personalInfo?.phone && <span>{displayResume.personalInfo.phone}</span>}
          {displayResume.personalInfo?.location && <span>•</span>}
          {displayResume.personalInfo?.location && <span>{displayResume.personalInfo.location}</span>}
          {displayResume.personalInfo?.website && <span>•</span>}
          {displayResume.personalInfo?.website && <span><a href={displayResume.personalInfo.website} target="_blank" rel="noreferrer" style={{ color: colors.primary }}>{displayResume.personalInfo.website}</a></span>}
        </div>
      </div>

      {/* Professional Summary */}
      {displayResume.personalInfo?.summary && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Professional Summary
          </h3>
          <p style={{ margin: 0, fontSize: '11px', lineHeight: 1.7, color: '#444' }}>{displayResume.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {displayResume.experience && displayResume.experience.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Experience
          </h3>
          {displayResume.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '14px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{exp.jobTitle}</div>
              <div style={{ color: '#666', fontSize: '10px', fontStyle: 'italic' }}>{exp.company}</div>
              {exp.location && <div style={{ color: '#888', fontSize: '10px' }}>{exp.location}</div>}
              <div style={{ color: '#888', fontSize: '10px', marginBottom: '4px' }}>
                {exp.startDate} - {exp.endDate || 'Present'}
              </div>
              {exp.description && <div style={{ color: '#555', fontSize: '10px', lineHeight: 1.6 }}>{exp.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {displayResume.education && displayResume.education.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Education
          </h3>
          {displayResume.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{edu.degree} in {edu.field || edu.fieldOfStudy}</div>
              <div style={{ color: '#666' }}>{edu.school}</div>
              {edu.startDate && edu.endDate && <div style={{ color: '#888', fontSize: '10px' }}>{edu.startDate} - {edu.endDate}</div>}
              {edu.description && <div style={{ color: '#555', fontSize: '10px' }}>{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {displayResume.skills && displayResume.skills.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Skills
          </h3>
          <div style={{ fontSize: '11px' }}>
            {displayResume.skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '8px' }}>
                {skill.category && <div style={{ fontWeight: 700, color: colors.accent, marginBottom: '4px' }}>{skill.category}</div>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {Array.isArray(skill.skills) ? skill.skills.map((s, sidx) => (
                    <span key={sidx} style={{ 
                      backgroundColor: colors.secondary, 
                      color: colors.accent,
                      padding: '4px 10px', 
                      borderRadius: '3px',
                      border: `1px solid ${colors.primary}`,
                      fontWeight: 500,
                      fontSize: '10px'
                    }}>
                      {s}
                    </span>
                  )) : <span style={{ color: colors.accent }}>{skill.name}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {displayResume.projects && displayResume.projects.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Projects
          </h3>
          {displayResume.projects.map((project, idx) => (
            <div key={idx} style={{ marginBottom: '14px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{project.name}</div>
              {project.technologies && <div style={{ color: '#666', fontSize: '10px' }}>{Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}</div>}
              {project.startDate && project.endDate && <div style={{ color: '#888', fontSize: '10px' }}>{project.startDate} - {project.endDate}</div>}
              {project.description && <div style={{ color: '#555', fontSize: '10px', lineHeight: 1.6 }}>{project.description}</div>}
              {project.link && <div style={{ color: colors.primary, fontSize: '10px' }}><a href={project.link} target="_blank" rel="noreferrer">{project.link}</a></div>}
              {project.github && <div style={{ color: colors.primary, fontSize: '10px' }}><a href={project.github} target="_blank" rel="noreferrer">{project.github}</a></div>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {displayResume.certifications && displayResume.certifications.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Certifications
          </h3>
          {displayResume.certifications.map((cert, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{cert.name}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{cert.issuer}</div>
              {(cert.issueDate || cert.date) && <div style={{ color: '#888', fontSize: '10px' }}>{cert.issueDate || cert.date}</div>}
              {cert.expiryDate && <div style={{ color: '#888', fontSize: '10px' }}>Expires: {cert.expiryDate}</div>}
              {cert.description && <div style={{ color: '#555', fontSize: '10px' }}>{cert.description}</div>}
              {cert.credentialUrl && <div style={{ color: colors.primary, fontSize: '10px' }}><a href={cert.credentialUrl} target="_blank" rel="noreferrer">View Credential</a></div>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {displayResume.languages && displayResume.languages.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Languages
          </h3>
          <div style={{ fontSize: '11px' }}>
            {displayResume.languages.map((lang, idx) => (
              <div key={idx} style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: colors.accent }}>{lang.name}</span>
                {lang.proficiency && <span style={{ color: '#666', marginLeft: '8px' }}>- {lang.proficiency}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer */}
      {displayResume.volunteer && displayResume.volunteer.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Volunteer Experience
          </h3>
          {displayResume.volunteer.map((vol, idx) => (
            <div key={idx} style={{ marginBottom: '14px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{vol.position}</div>
              <div style={{ color: '#666', fontSize: '10px', fontStyle: 'italic' }}>{vol.organization}</div>
              {vol.location && <div style={{ color: '#888', fontSize: '10px' }}>{vol.location}</div>}
              <div style={{ color: '#888', fontSize: '10px', marginBottom: '4px' }}>
                {vol.startDate} - {vol.endDate || 'Present'}
              </div>
              {vol.description && <div style={{ color: '#555', fontSize: '10px', lineHeight: 1.6 }}>{vol.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {displayResume.awards && displayResume.awards.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Awards & Recognition
          </h3>
          {displayResume.awards.map((award, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{award.name}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{award.issuer}</div>
              {award.date && <div style={{ color: '#888', fontSize: '10px' }}>{award.date}</div>}
              {award.description && <div style={{ color: '#555', fontSize: '10px' }}>{award.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Publications */}
      {displayResume.publications && displayResume.publications.length > 0 && (
        <div>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
            Publications
          </h3>
          {displayResume.publications.map((pub, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{pub.title}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{pub.publisher}</div>
              {(pub.publicationDate || pub.date) && <div style={{ color: '#888', fontSize: '10px' }}>{pub.publicationDate || pub.date}</div>}
              {pub.description && <div style={{ color: '#555', fontSize: '10px' }}>{pub.description}</div>}
              {pub.link && <div style={{ color: colors.primary, fontSize: '10px' }}><a href={pub.link} target="_blank" rel="noreferrer">Read Publication</a></div>}
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  const renderMinimalTemplate = () => {
    const displayResume = resume && (resume.experience?.length > 0 || resume.education?.length > 0 || resume.skills?.length > 0) 
      ? resume 
      : {
          personalInfo: { fullName: 'Sample Name', email: 'email@example.com', phone: '(555) 123-4567', location: 'City, State' },
          experience: [{ jobTitle: 'Job Title', company: 'Company Name', startDate: '2020', endDate: '2023', description: 'Job description' }],
          education: [{ degree: 'Bachelor', field: 'Computer Science', school: 'University Name', startDate: '2016', endDate: '2020' }],
          skills: [{ category: 'Languages', skills: ['JavaScript', 'Python'] }]
        };

    return (
    <div style={{
      fontFamily: 'Georgia, serif',
      lineHeight: 1.8,
      color: '#1a1a1a',
      padding: '50px 45px',
      backgroundColor: '#fafafa',
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      boxSizing: 'border-box',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflow: 'visible',
    }}>
      <h1 style={{ margin: '0 0 12px 0', fontSize: '36px', fontWeight: 'normal', letterSpacing: '2px', color: colors.primary }}>
        {displayResume.personalInfo?.fullName || 'Your Name'}
      </h1>
      <div style={{ fontSize: '11px', marginBottom: '35px', color: '#666', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '15px' }}>
        {displayResume.personalInfo?.email && <span>{displayResume.personalInfo.email}</span>}
        {displayResume.personalInfo?.phone && <span> • {displayResume.personalInfo.phone}</span>}
        {displayResume.personalInfo?.location && <span> • {displayResume.personalInfo.location}</span>}
      </div>

      {displayResume.personalInfo?.summary && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Professional Summary
          </h3>
          <p style={{ margin: 0, fontSize: '11px', lineHeight: 1.8, color: '#555', textAlign: 'justify' }}>{displayResume.personalInfo.summary}</p>
        </div>
      )}

      {displayResume.experience && displayResume.experience.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Experience
          </h3>
          {displayResume.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '16px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{exp.jobTitle}</div>
              <div style={{ fontStyle: 'italic', color: '#666' }}>{exp.company}</div>
              {exp.location && <div style={{ color: '#999', fontSize: '10px' }}>{exp.location}</div>}
              <div style={{ color: '#999', fontSize: '10px', marginBottom: '4px' }}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </div>
              {exp.description && <div style={{ color: '#555', fontSize: '10px', lineHeight: 1.6 }}>{exp.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.education && displayResume.education.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Education
          </h3>
          {displayResume.education.map((edu, idx) => (
            <div key={idx} style={{ fontSize: '11px', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{edu.degree} in {edu.field || edu.fieldOfStudy}</div>
              <div style={{ color: '#666' }}>{edu.school}</div>
              {edu.startDate && edu.endDate && <div style={{ color: '#999', fontSize: '10px' }}>{edu.startDate} - {edu.endDate}</div>}
              {edu.description && <div style={{ color: '#555', fontSize: '10px' }}>{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.skills && displayResume.skills.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Skills
          </h3>
          <div style={{ fontSize: '11px' }}>
            {displayResume.skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '8px' }}>
                {skill.category && <div style={{ fontWeight: 'bold', color: colors.accent, marginBottom: '4px' }}>{skill.category}</div>}
                {Array.isArray(skill.skills) ? skill.skills.map((s, sidx) => (
                  <div key={sidx} style={{ marginBottom: '4px', color: colors.accent }}>{s}</div>
                )) : <div style={{ color: colors.accent }}>{skill.name}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {displayResume.projects && displayResume.projects.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Projects
          </h3>
          {displayResume.projects.map((project, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{project.name}</div>
              {project.technologies && <div style={{ color: '#666', fontSize: '10px' }}>{Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}</div>}
              {project.startDate && project.endDate && <div style={{ color: '#999', fontSize: '10px' }}>{project.startDate} - {project.endDate}</div>}
              {project.description && <div style={{ color: '#555', fontSize: '10px' }}>{project.description}</div>}
              {project.link && <div style={{ color: colors.primary, fontSize: '10px' }}><a href={project.link} target="_blank" rel="noreferrer">Link</a></div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.certifications && displayResume.certifications.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Certifications
          </h3>
          {displayResume.certifications.map((cert, idx) => (
            <div key={idx} style={{ marginBottom: '8px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{cert.name}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{cert.issuer}</div>
              {(cert.issueDate || cert.date) && <div style={{ color: '#888', fontSize: '10px' }}>{cert.issueDate || cert.date}</div>}
              {cert.description && <div style={{ color: '#555', fontSize: '10px' }}>{cert.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.languages && displayResume.languages.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Languages
          </h3>
          <div style={{ fontSize: '11px' }}>
            {displayResume.languages.map((lang, idx) => (
              <div key={idx} style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold', color: colors.accent }}>{lang.name}</span>
                {lang.proficiency && <span style={{ color: '#666', marginLeft: '8px', fontSize: '10px' }}>- {lang.proficiency}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {displayResume.volunteer && displayResume.volunteer.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Volunteer Work
          </h3>
          {displayResume.volunteer.map((vol, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{vol.position}</div>
              <div style={{ fontStyle: 'italic', color: '#666' }}>{vol.organization}</div>
              {vol.location && <div style={{ color: '#999', fontSize: '10px' }}>{vol.location}</div>}
              <div style={{ color: '#999', fontSize: '10px', marginBottom: '4px' }}>
                {vol.startDate} – {vol.endDate || 'Present'}
              </div>
              {vol.description && <div style={{ color: '#555', fontSize: '10px' }}>{vol.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.awards && displayResume.awards.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Awards
          </h3>
          {displayResume.awards.map((award, idx) => (
            <div key={idx} style={{ marginBottom: '8px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{award.name}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{award.issuer}</div>
              {award.date && <div style={{ color: '#999', fontSize: '10px' }}>{award.date}</div>}
              {award.description && <div style={{ color: '#555', fontSize: '10px' }}>{award.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.publications && displayResume.publications.length > 0 && (
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', color: colors.primary, textTransform: 'uppercase' }}>
            Publications
          </h3>
          {displayResume.publications.map((pub, idx) => (
            <div key={idx} style={{ marginBottom: '8px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{pub.title}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{pub.publisher}</div>
              {(pub.publicationDate || pub.date) && <div style={{ color: '#999', fontSize: '10px' }}>{pub.publicationDate || pub.date}</div>}
              {pub.description && <div style={{ color: '#555', fontSize: '10px' }}>{pub.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  const renderClassicTemplate = () => {
    const displayResume = resume && (resume.experience?.length > 0 || resume.education?.length > 0 || resume.skills?.length > 0) 
      ? resume 
      : {
          personalInfo: { fullName: 'Sample Name', email: 'email@example.com', phone: '(555) 123-4567', location: 'City, State' },
          experience: [{ jobTitle: 'Job Title', company: 'Company Name', startDate: '2020', endDate: '2023', description: 'Job description' }],
          education: [{ degree: 'Bachelor', field: 'Computer Science', school: 'University Name', startDate: '2016', endDate: '2020' }],
          skills: [{ category: 'Languages', skills: ['JavaScript', 'Python'] }]
        };

    return (
    <div style={{
      fontFamily: 'Times New Roman, serif',
      lineHeight: 1.6,
      color: '#000',
      padding: '45px 40px',
      backgroundColor: '#fff',
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      boxSizing: 'border-box',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      border: `2px solid ${colors.primary}`,
      overflow: 'visible',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '25px', borderBottom: `3px solid ${colors.primary}`, paddingBottom: '15px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 'bold', color: colors.primary }}>
          {displayResume.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '11px', color: '#333' }}>
          {displayResume.personalInfo?.email && <span>{displayResume.personalInfo.email}</span>}
          {displayResume.personalInfo?.phone && <span> | {displayResume.personalInfo.phone}</span>}
          {displayResume.personalInfo?.location && <span> | {displayResume.personalInfo.location}</span>}
        </div>
      </div>

      {displayResume.personalInfo?.summary && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Professional Summary
          </h3>
          <p style={{ margin: 0, fontSize: '11px', color: '#555', lineHeight: 1.6 }}>{displayResume.personalInfo.summary}</p>
        </div>
      )}

      {displayResume.experience && displayResume.experience.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Experience
          </h3>
          {displayResume.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{exp.jobTitle}</div>
              <div style={{ color: '#333' }}>{exp.company}</div>
              {exp.location && <div style={{ fontSize: '10px', color: '#666' }}>{exp.location}</div>}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {exp.startDate} to {exp.endDate || 'Present'}
              </div>
              {exp.description && <div style={{ fontSize: '10px', color: '#555', marginTop: '3px' }}>{exp.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.education && displayResume.education.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Education
          </h3>
          {displayResume.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{edu.degree} in {edu.field || edu.fieldOfStudy}</div>
              <div style={{ color: '#333' }}>{edu.school}</div>
              {edu.startDate && edu.endDate && <div style={{ color: '#666', fontSize: '10px' }}>{edu.startDate} - {edu.endDate}</div>}
              {edu.description && <div style={{ color: '#555', fontSize: '10px' }}>{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.skills && displayResume.skills.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Skills
          </h3>
          <div style={{ fontSize: '11px' }}>
            {displayResume.skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '6px' }}>
                {skill.category && <div style={{ fontWeight: 'bold', color: colors.accent, marginBottom: '3px' }}>{skill.category}:</div>}
                {Array.isArray(skill.skills) ? skill.skills.map((s, sidx) => (
                  <span key={sidx} style={{ marginRight: '12px', color: colors.accent, fontWeight: 500 }}>
                    {s}
                  </span>
                )) : <span style={{ color: colors.accent, fontWeight: 500 }}>{skill.name}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {displayResume.projects && displayResume.projects.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Projects
          </h3>
          {displayResume.projects.map((project, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{project.name}</div>
              {project.technologies && <div style={{ fontSize: '10px', color: '#666' }}>{Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}</div>}
              {project.startDate && project.endDate && <div style={{ fontSize: '10px', color: '#666' }}>{project.startDate} - {project.endDate}</div>}
              {project.description && <div style={{ fontSize: '10px', color: '#555' }}>{project.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.certifications && displayResume.certifications.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Certifications
          </h3>
          {displayResume.certifications.map((cert, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{cert.name}</div>
              <div style={{ color: '#333', fontSize: '10px' }}>{cert.issuer}</div>
              {(cert.issueDate || cert.date) && <div style={{ color: '#666', fontSize: '10px' }}>{cert.issueDate || cert.date}</div>}
              {cert.description && <div style={{ color: '#555', fontSize: '10px' }}>{cert.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.languages && displayResume.languages.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Languages
          </h3>
          <div style={{ fontSize: '11px' }}>
            {displayResume.languages.map((lang, idx) => (
              <div key={idx} style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', color: colors.accent }}>{lang.name}</span>
                {lang.proficiency && <span style={{ color: '#666', marginLeft: '8px', fontSize: '10px' }}>- {lang.proficiency}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {displayResume.volunteer && displayResume.volunteer.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Volunteer
          </h3>
          {displayResume.volunteer.map((vol, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{vol.position}</div>
              <div style={{ color: '#333' }}>{vol.organization}</div>
              {vol.location && <div style={{ fontSize: '10px', color: '#666' }}>{vol.location}</div>}
              <div style={{ fontSize: '10px', color: '#666' }}>
                {vol.startDate} to {vol.endDate || 'Present'}
              </div>
              {vol.description && <div style={{ fontSize: '10px', color: '#555' }}>{vol.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.awards && displayResume.awards.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Awards
          </h3>
          {displayResume.awards.map((award, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{award.name}</div>
              <div style={{ color: '#333', fontSize: '10px' }}>{award.issuer}</div>
              {award.date && <div style={{ color: '#666', fontSize: '10px' }}>{award.date}</div>}
              {award.description && <div style={{ color: '#555', fontSize: '10px' }}>{award.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.publications && displayResume.publications.length > 0 && (
        <div>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: colors.primary, borderBottom: `1px solid ${colors.primary}`, paddingBottom: '5px' }}>
            Publications
          </h3>
          {displayResume.publications.map((pub, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{pub.title}</div>
              <div style={{ color: '#333', fontSize: '10px' }}>{pub.publisher}</div>
              {(pub.publicationDate || pub.date) && <div style={{ color: '#666', fontSize: '10px' }}>{pub.publicationDate || pub.date}</div>}
              {pub.description && <div style={{ color: '#555', fontSize: '10px' }}>{pub.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  const renderCreativeTemplate = () => {
    const displayResume = resume && (resume.experience?.length > 0 || resume.education?.length > 0 || resume.skills?.length > 0) 
      ? resume 
      : {
          personalInfo: { fullName: 'Sample Name', email: 'email@example.com', phone: '(555) 123-4567', location: 'City, State' },
          experience: [{ jobTitle: 'Job Title', company: 'Company Name', startDate: '2020', endDate: '2023', description: 'Job description' }],
          education: [{ degree: 'Bachelor', field: 'Computer Science', school: 'University Name', startDate: '2016', endDate: '2020' }],
          skills: [{ category: 'Languages', skills: ['JavaScript', 'Python'] }]
        };

    return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      lineHeight: 1.6,
      color: '#2c3e50',
      padding: '35px',
      backgroundColor: '#fff',
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      boxSizing: 'border-box',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflow: 'visible',
    }}>
      <div style={{ background: colors.primary, color: '#fff', padding: '25px', marginBottom: '25px', borderRadius: '8px', boxShadow: `0 4px 12px ${colors.primary}40` }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: 700 }}>
          {displayResume.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '12px', opacity: 0.95 }}>
          {displayResume.personalInfo?.email && <span>{displayResume.personalInfo.email}</span>}
          {displayResume.personalInfo?.phone && <span> | {displayResume.personalInfo.phone}</span>}
          {displayResume.personalInfo?.location && <span> | {displayResume.personalInfo.location}</span>}
        </div>
      </div>

      {displayResume.personalInfo?.summary && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Professional Summary
          </h3>
          <p style={{ margin: 0, fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}`, color: '#555', lineHeight: 1.6 }}>{displayResume.personalInfo.summary}</p>
        </div>
      )}

      {displayResume.experience && displayResume.experience.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Experience
          </h3>
          {displayResume.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}` }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{exp.jobTitle}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{exp.company}</div>
              {exp.location && <div style={{ color: '#888', fontSize: '10px' }}>{exp.location}</div>}
              <div style={{ fontSize: '10px', color: '#999', marginBottom: '4px' }}>
                {exp.startDate} - {exp.endDate || 'Present'}
              </div>
              {exp.description && <div style={{ fontSize: '10px', color: '#555', lineHeight: 1.6 }}>{exp.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.education && displayResume.education.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Education
          </h3>
          {displayResume.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}` }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{edu.degree} in {edu.field || edu.fieldOfStudy}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{edu.school}</div>
              {edu.startDate && edu.endDate && <div style={{ color: '#999', fontSize: '10px' }}>{edu.startDate} - {edu.endDate}</div>}
              {edu.description && <div style={{ color: '#555', fontSize: '10px' }}>{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.skills && displayResume.skills.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Skills
          </h3>
          <div style={{ fontSize: '11px', paddingLeft: '12px' }}>
            {displayResume.skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '8px' }}>
                {skill.category && <div style={{ fontWeight: 700, color: colors.accent, marginBottom: '4px' }}>{skill.category}</div>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderLeft: `2px solid ${colors.secondary}`, paddingLeft: '8px' }}>
                  {Array.isArray(skill.skills) ? skill.skills.map((s, sidx) => (
                    <span key={sidx} style={{ 
                      display: 'inline-block',
                      background: colors.secondary, 
                      color: colors.accent,
                      padding: '6px 12px', 
                      borderRadius: '20px',
                      border: `2px solid ${colors.primary}`,
                      fontWeight: 600,
                      fontSize: '10px'
                    }}>
                      {s}
                    </span>
                  )) : <span style={{ color: colors.accent }}>{skill.name}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {displayResume.projects && displayResume.projects.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Projects
          </h3>
          {displayResume.projects.map((project, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}` }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{project.name}</div>
              {project.technologies && <div style={{ fontSize: '10px', color: '#666' }}>{Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}</div>}
              {project.startDate && project.endDate && <div style={{ fontSize: '10px', color: '#999' }}>{project.startDate} - {project.endDate}</div>}
              {project.description && <div style={{ fontSize: '10px', color: '#555' }}>{project.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.certifications && displayResume.certifications.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Certifications
          </h3>
          {displayResume.certifications.map((cert, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}` }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{cert.name}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{cert.issuer}</div>
              {(cert.issueDate || cert.date) && <div style={{ color: '#999', fontSize: '10px' }}>{cert.issueDate || cert.date}</div>}
              {cert.description && <div style={{ color: '#555', fontSize: '10px' }}>{cert.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.languages && displayResume.languages.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Languages
          </h3>
          {displayResume.languages.map((lang, idx) => (
            <div key={idx} style={{ marginBottom: '6px', fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}` }}>
              <span style={{ fontWeight: 700, color: colors.accent }}>{lang.name}</span>
              {lang.proficiency && <span style={{ color: '#666', marginLeft: '8px', fontSize: '10px' }}>- {lang.proficiency}</span>}
            </div>
          ))}
        </div>
      )}

      {displayResume.volunteer && displayResume.volunteer.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Volunteer
          </h3>
          {displayResume.volunteer.map((vol, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}` }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{vol.position}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{vol.organization}</div>
              {vol.location && <div style={{ color: '#999', fontSize: '10px' }}>{vol.location}</div>}
              <div style={{ fontSize: '10px', color: '#999' }}>
                {vol.startDate} - {vol.endDate || 'Present'}
              </div>
              {vol.description && <div style={{ fontSize: '10px', color: '#555' }}>{vol.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.awards && displayResume.awards.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Awards
          </h3>
          {displayResume.awards.map((award, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}` }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{award.name}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{award.issuer}</div>
              {award.date && <div style={{ color: '#999', fontSize: '10px' }}>{award.date}</div>}
              {award.description && <div style={{ color: '#555', fontSize: '10px' }}>{award.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.publications && displayResume.publications.length > 0 && (
        <div>
          <h3 style={{ color: colors.primary, fontSize: '13px', marginBottom: '10px', fontWeight: 700, borderLeft: `5px solid ${colors.primary}`, paddingLeft: '12px', textTransform: 'uppercase' }}>
            Publications
          </h3>
          {displayResume.publications.map((pub, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px', paddingLeft: '12px', borderLeft: `2px solid ${colors.secondary}` }}>
              <div style={{ fontWeight: 700, color: colors.accent }}>{pub.title}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{pub.publisher}</div>
              {(pub.publicationDate || pub.date) && <div style={{ color: '#999', fontSize: '10px' }}>{pub.publicationDate || pub.date}</div>}
              {pub.description && <div style={{ color: '#555', fontSize: '10px' }}>{pub.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  const renderAcademicTemplate = () => {
    const displayResume = resume && (resume.experience?.length > 0 || resume.education?.length > 0 || resume.skills?.length > 0) 
      ? resume 
      : {
          personalInfo: { fullName: 'Sample Name', email: 'email@example.com', phone: '(555) 123-4567', location: 'City, State' },
          experience: [{ jobTitle: 'Job Title', company: 'Company Name', startDate: '2020', endDate: '2023', description: 'Job description' }],
          education: [{ degree: 'Bachelor', field: 'Computer Science', school: 'University Name', startDate: '2016', endDate: '2020' }],
          skills: [{ category: 'Languages', skills: ['JavaScript', 'Python'] }]
        };

    return (
    <div style={{
      fontFamily: 'Cambria, serif',
      lineHeight: 1.8,
      color: '#1a1a1a',
      padding: '50px 45px',
      backgroundColor: '#fafafa',
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      boxSizing: 'border-box',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      border: `1px solid ${colors.primary}`,
      overflow: 'visible',
    }}>
      <div style={{ marginBottom: '28px', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '15px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: 'bold', color: colors.primary }}>
          {displayResume.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '11px', color: '#555' }}>
          {displayResume.personalInfo?.email && <span>{displayResume.personalInfo.email}</span>}
          {displayResume.personalInfo?.phone && <span> • {displayResume.personalInfo.phone}</span>}
          {displayResume.personalInfo?.location && <span> • {displayResume.personalInfo.location}</span>}
        </div>
      </div>

      {displayResume.personalInfo?.summary && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Professional Summary
          </h3>
          <p style={{ margin: 0, fontSize: '11px', textAlign: 'justify', lineHeight: 1.8, color: '#444' }}>{displayResume.personalInfo.summary}</p>
        </div>
      )}

      {displayResume.experience && displayResume.experience.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Professional Experience
          </h3>
          {displayResume.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '14px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{exp.jobTitle}</div>
              <div style={{ fontStyle: 'italic', color: '#666' }}>{exp.company}</div>
              {exp.location && <div style={{ fontSize: '10px', color: '#888' }}>{exp.location}</div>}
              <div style={{ fontSize: '10px', color: '#888', marginBottom: '4px' }}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </div>
              {exp.description && <div style={{ fontSize: '10px', color: '#555', lineHeight: 1.7 }}>{exp.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.education && displayResume.education.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Education
          </h3>
          {displayResume.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{edu.degree} in {edu.field || edu.fieldOfStudy}</div>
              <div style={{ color: '#666' }}>{edu.school}</div>
              {edu.startDate && edu.endDate && <div style={{ color: '#888', fontSize: '10px' }}>{edu.startDate} - {edu.endDate}</div>}
              {edu.description && <div style={{ color: '#555', fontSize: '10px' }}>{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.skills && displayResume.skills.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Skills
          </h3>
          <div style={{ fontSize: '11px' }}>
            {displayResume.skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '8px' }}>
                {skill.category && <div style={{ fontWeight: 'bold', color: colors.accent, marginBottom: '4px' }}>{skill.category}</div>}
                {Array.isArray(skill.skills) ? skill.skills.map((s, sidx) => (
                  <div key={sidx} style={{ marginBottom: '3px', color: colors.accent }}>{s}</div>
                )) : <div style={{ color: colors.accent }}>{skill.name}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {displayResume.projects && displayResume.projects.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Projects
          </h3>
          {displayResume.projects.map((project, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{project.name}</div>
              {project.technologies && <div style={{ fontSize: '10px', color: '#666' }}>{Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}</div>}
              {project.startDate && project.endDate && <div style={{ fontSize: '10px', color: '#888' }}>{project.startDate} - {project.endDate}</div>}
              {project.description && <div style={{ fontSize: '10px', color: '#555' }}>{project.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.certifications && displayResume.certifications.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Certifications
          </h3>
          {displayResume.certifications.map((cert, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{cert.name}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{cert.issuer}</div>
              {(cert.issueDate || cert.date) && <div style={{ color: '#888', fontSize: '10px' }}>{cert.issueDate || cert.date}</div>}
              {cert.description && <div style={{ color: '#555', fontSize: '10px' }}>{cert.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.languages && displayResume.languages.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Languages
          </h3>
          <div style={{ fontSize: '11px' }}>
            {displayResume.languages.map((lang, idx) => (
              <div key={idx} style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', color: colors.accent }}>{lang.name}</span>
                {lang.proficiency && <span style={{ color: '#666', marginLeft: '8px', fontSize: '10px' }}>- {lang.proficiency}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {displayResume.volunteer && displayResume.volunteer.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Volunteer Work
          </h3>
          {displayResume.volunteer.map((vol, idx) => (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{vol.position}</div>
              <div style={{ fontStyle: 'italic', color: '#666' }}>{vol.organization}</div>
              {vol.location && <div style={{ color: '#888', fontSize: '10px' }}>{vol.location}</div>}
              <div style={{ fontSize: '10px', color: '#888', marginBottom: '4px' }}>
                {vol.startDate} – {vol.endDate || 'Present'}
              </div>
              {vol.description && <div style={{ fontSize: '10px', color: '#555', lineHeight: 1.7 }}>{vol.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.awards && displayResume.awards.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Awards & Recognition
          </h3>
          {displayResume.awards.map((award, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{award.name}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{award.issuer}</div>
              {award.date && <div style={{ color: '#888', fontSize: '10px' }}>{award.date}</div>}
              {award.description && <div style={{ color: '#555', fontSize: '10px' }}>{award.description}</div>}
            </div>
          ))}
        </div>
      )}

      {displayResume.publications && displayResume.publications.length > 0 && (
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: colors.primary }}>
            Publications
          </h3>
          {displayResume.publications.map((pub, idx) => (
            <div key={idx} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', color: colors.accent }}>{pub.title}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>{pub.publisher}</div>
              {(pub.publicationDate || pub.date) && <div style={{ color: '#888', fontSize: '10px' }}>{pub.publicationDate || pub.date}</div>}
              {pub.description && <div style={{ color: '#555', fontSize: '10px' }}>{pub.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  const getTemplateRenderer = () => {
    switch (template) {
      case 'classic':
        return renderClassicTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'academic':
        return renderAcademicTemplate();
      case 'modern':
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div id="resume-preview">
      {getTemplateRenderer()}
    </div>
  );
}

export default ResumePreview;
