# Resume Builder Platform

A full-featured resume builder platform built with MERN stack (MongoDB, Express, React, Node.js) and Ant Design.

## Features

- **User Authentication**: Secure registration and login
- **Full CMS Control**: Complete control over every resume section
- **Multiple Sections**: Personal Info, Experience, Education, Skills, Projects, Certifications, Languages
- **Live Preview**: Real-time resume preview while editing
- **Multiple Templates**: Different resume templates (Modern, Classic, etc.)
- **Theme Customization**: Choose from different color themes
- **PDF Export**: Download resume as PDF
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-save**: Automatic saving of resume data

## Tech Stack

### Backend
- Node.js & Express
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

### Frontend
- React 18
- Vite
- Ant Design
- Zustand (State Management)
- Axios (HTTP Client)
- React Router

## Project Structure

```
resume-builder/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Resume.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── resume.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   ├── PersonalInfoForm.jsx
│   │   │   │   ├── ExperienceForm.jsx
│   │   │   │   ├── EducationForm.jsx
│   │   │   │   └── SkillsForm.jsx
│   │   │   ├── preview/
│   │   │   │   └── ResumePreview.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ResumeEditor.jsx
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   └── resumeStore.js
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── package.json
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
cd resume-builder
```

2. **Install root dependencies**
```bash
npm install
```

3. **Setup Backend**
```bash
cd server
npm install
```

Create `.env` file in server directory:
```
MONGODB_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. **Setup Frontend**
```bash
cd ../client
npm install
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Run Development Servers**

From root directory:
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Frontend will be available at: `http://localhost:5173`
Backend API at: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Resume
- `GET /api/resume` - Get all user resumes
- `GET /api/resume/:id` - Get single resume
- `POST /api/resume` - Create new resume
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume

## Usage

1. **Register/Login**: Create an account or login
2. **Create Resume**: Click "Create Resume" button on dashboard
3. **Edit Resume**: Fill in all sections with your information
4. **Live Preview**: See changes in real-time on the right panel
5. **Save**: Click Save button to persist changes
6. **Download**: Export resume as PDF

## Features to Add

- [ ] Multiple resume templates
- [ ] Theme customization
- [ ] PDF export functionality
- [ ] Resume sharing/public links
- [ ] Resume templates gallery
- [ ] Undo/Redo functionality
- [ ] Drag and drop sections
- [ ] Import from LinkedIn
- [ ] Email notifications
- [ ] Analytics dashboard

## Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
