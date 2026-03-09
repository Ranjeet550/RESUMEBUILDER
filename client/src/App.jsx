import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeEditor from './pages/ResumeEditor';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <ResumeEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <ResumeEditor />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
