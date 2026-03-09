import { create } from 'zustand';

const initialResume = {
  title: 'My Resume',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    profileImage: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  volunteer: [],
  awards: [],
  publications: [],
  template: 'modern',
  theme: 'blue',
  visibility: 'private'
};

export const useResumeStore = create((set) => ({
  resume: initialResume,
  resumes: [],

  setResume: (resume) => set({ resume }),
  updatePersonalInfo: (personalInfo) =>
    set((state) => ({
      resume: { ...state.resume, personalInfo }
    })),

  // Experience
  addExperience: (experience) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [...state.resume.experience, experience]
      }
    })),
  updateExperience: (index, experience) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((exp, i) => (i === index ? experience : exp))
      }
    })),
  removeExperience: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((_, i) => i !== index)
      }
    })),

  // Education
  addEducation: (education) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [...state.resume.education, education]
      }
    })),
  updateEducation: (index, education) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((edu, i) => (i === index ? education : edu))
      }
    })),
  removeEducation: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((_, i) => i !== index)
      }
    })),

  // Skills
  addSkill: (skill) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: [...state.resume.skills, skill]
      }
    })),
  updateSkill: (index, skill) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.map((s, i) => (i === index ? skill : s))
      }
    })),
  removeSkill: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.filter((_, i) => i !== index)
      }
    })),

  // Projects
  addProject: (project) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [...state.resume.projects, project]
      }
    })),
  updateProject: (index, project) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((p, i) => (i === index ? project : p))
      }
    })),
  removeProject: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((_, i) => i !== index)
      }
    })),

  // Certifications
  addCertification: (certification) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: [...state.resume.certifications, certification]
      }
    })),
  updateCertification: (index, certification) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: state.resume.certifications.map((c, i) => (i === index ? certification : c))
      }
    })),
  removeCertification: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: state.resume.certifications.filter((_, i) => i !== index)
      }
    })),

  // Languages
  addLanguage: (language) =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: [...state.resume.languages, language]
      }
    })),
  updateLanguage: (index, language) =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: state.resume.languages.map((l, i) => (i === index ? language : l))
      }
    })),
  removeLanguage: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: state.resume.languages.filter((_, i) => i !== index)
      }
    })),

  // Volunteer
  addVolunteer: (volunteer) =>
    set((state) => ({
      resume: {
        ...state.resume,
        volunteer: [...state.resume.volunteer, volunteer]
      }
    })),
  updateVolunteer: (index, volunteer) =>
    set((state) => ({
      resume: {
        ...state.resume,
        volunteer: state.resume.volunteer.map((v, i) => (i === index ? volunteer : v))
      }
    })),
  removeVolunteer: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        volunteer: state.resume.volunteer.filter((_, i) => i !== index)
      }
    })),

  // Awards
  addAward: (award) =>
    set((state) => ({
      resume: {
        ...state.resume,
        awards: [...state.resume.awards, award]
      }
    })),
  updateAward: (index, award) =>
    set((state) => ({
      resume: {
        ...state.resume,
        awards: state.resume.awards.map((a, i) => (i === index ? award : a))
      }
    })),
  removeAward: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        awards: state.resume.awards.filter((_, i) => i !== index)
      }
    })),

  // Publications
  addPublication: (publication) =>
    set((state) => ({
      resume: {
        ...state.resume,
        publications: [...state.resume.publications, publication]
      }
    })),
  updatePublication: (index, publication) =>
    set((state) => ({
      resume: {
        ...state.resume,
        publications: state.resume.publications.map((p, i) => (i === index ? publication : p))
      }
    })),
  removePublication: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        publications: state.resume.publications.filter((_, i) => i !== index)
      }
    })),

  setResumes: (resumes) => set({ resumes }),
  resetResume: () => set({ resume: initialResume })
}));
