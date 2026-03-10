import { useState, useEffect } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { DragOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

const sectionLabels = {
  personal: 'Personal Information',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  volunteer: 'Volunteer Experience',
  awards: 'Awards & Recognition',
  publications: 'Publications'
};

export default function SectionReorderer() {
  const resume = useResumeStore((state) => state.resume);
  const setSectionOrder = useResumeStore((state) => state.setSectionOrder);
  const [sections, setSections] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    // Get all available sections from sectionLabels
    const allSections = Object.keys(sectionLabels);
    
    // If resume has a sectionOrder, use it but ensure all sections are included
    if (resume.sectionOrder && Array.isArray(resume.sectionOrder)) {
      // Add any missing sections that aren't in the saved order
      const missingSection = allSections.filter(s => !resume.sectionOrder.includes(s));
      const order = [...resume.sectionOrder, ...missingSection];
      setSections(order);
    } else {
      // Use default order if no sectionOrder exists
      setSections(allSections);
    }
  }, [resume.sectionOrder]);

  const moveUp = (index) => {
    if (index === 0) return;
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    setSections(newSections);
    setSectionOrder(newSections);
  };

  const moveDown = (index) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    setSections(newSections);
    setSectionOrder(newSections);
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetIndex) {
      setDraggedItem(null);
      return;
    }

    const newSections = [...sections];
    const draggedSection = newSections[draggedItem];
    newSections.splice(draggedItem, 1);
    newSections.splice(targetIndex, 0, draggedSection);

    setSections(newSections);
    setSectionOrder(newSections);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontWeight: 600 }}>Reorder Sections</h4>
      <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>Drag sections to reorder or use arrow buttons</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sections.map((section, index) => (
          <div
            key={section}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              background: draggedItem === index ? '#e6f7ff' : '#fafafa',
              border: draggedItem === index ? '2px dashed #1890ff' : '1px solid #e8e8e8',
              borderRadius: 6,
              transition: 'all 0.2s',
              cursor: draggedItem === index ? 'grabbing' : 'grab',
              opacity: draggedItem === index ? 0.7 : 1
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
              <DragOutlined style={{ color: '#1890ff', fontSize: 14, cursor: 'grab' }} />
              <span style={{ fontSize: 14 }}>{sectionLabels[section]}</span>
            </div>
            <Space size={4}>
              <Button
                type="text"
                size="small"
                icon={<ArrowUpOutlined />}
                onClick={() => moveUp(index)}
                disabled={index === 0}
                style={{ fontSize: 12 }}
              />
              <Button
                type="text"
                size="small"
                icon={<ArrowDownOutlined />}
                onClick={() => moveDown(index)}
                disabled={index === sections.length - 1}
                style={{ fontSize: 12 }}
              />
            </Space>
          </div>
        ))}
      </div>
    </div>
  );
}
