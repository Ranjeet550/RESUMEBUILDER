import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'My Resume'
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    linkedin: String,
    github: String,
    summary: String,
    profileImage: String
  },
  experience: [{
    jobTitle: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    currentlyWorking: Boolean,
    description: String,
    achievements: [String]
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String,
    description: String,
    activities: String
  }],
  skills: [{
    category: String,
    skills: [String]
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String,
    github: String,
    startDate: String,
    endDate: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    issueDate: String,
    expiryDate: String,
    credentialId: String,
    credentialUrl: String
  }],
  languages: [{
    language: String,
    proficiency: String
  }],
  volunteer: [{
    organization: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  awards: [{
    title: String,
    issuer: String,
    date: String,
    description: String
  }],
  publications: [{
    title: String,
    publisher: String,
    date: String,
    link: String,
    description: String
  }],
  template: {
    type: String,
    default: 'modern'
  },
  theme: {
    type: String,
    default: 'blue'
  },
  visibility: {
    type: String,
    enum: ['private', 'public'],
    default: 'private'
  },
  sectionOrder: {
    type: [String],
    default: ['personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'volunteer', 'awards', 'publications']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resume', resumeSchema);
