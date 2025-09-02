// src/routes/index.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// Layouts
import RootLayout from '../layout/RootLayout';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import StudentListPage from '../pages/StudentListPage';
import StudentDetailPage from '../pages/StudentDetailPage';
import CourseListPage from '../pages/CourseListPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import MentionsPage from '../pages/MentionsPage';
import ConfidentialitePage from '../pages/ConfidentialitePage';
import NotFoundPage from '../pages/NotFoundPage';

// Route protégée qui vérifie l'authentification
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  
  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Afficher le contenu protégé si l'utilisateur est authentifié
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Routes publiques */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="courses" element={<CourseListPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
          <Route path="mentions" element={<MentionsPage />} />
          <Route path="confidentialite" element={<ConfidentialitePage />} />
          
          {/* Routes protégées */}
          <Route path="students" element={
            <ProtectedRoute>
              <StudentListPage />
            </ProtectedRoute>
          } />
          <Route path="students/:id" element={
            <ProtectedRoute>
              <StudentDetailPage />
            </ProtectedRoute>
          } />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;