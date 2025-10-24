import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PublicRoute from '../components/PublicRoute/PublicRoute';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CourseListPage from '../pages/CourseListPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import CreateCoursePage from '../pages/CreateCoursePage';
import EditCoursePage from '../pages/EditCoursePage';
import StudentListPage from '../pages/StudentListPage';
import StudentDetailPage from '../pages/StudentDetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import MentionsPage from '../pages/MentionsPage';
import ConfidentialitePage from '../pages/ConfidentialitePage';
import ProfilePage from '../pages/ProfilePage';


const AppRoutes = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<HomePage />} />
            <Route path="/mentions-legales" element={<MentionsPage />} />
            <Route path="/confidentialite" element={<ConfidentialitePage />} />
            
            {/* Routes login/register - Seulement si PAS connecté */}
            <Route 
              path="/login" 
              element={
                <PublicRoute redirectTo="/">
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute redirectTo="/">
                  <RegisterPage />
                </PublicRoute>
              } 
            />
            
            {/* Routes protégées - Seulement si connecté */}
            <Route 
              path="/courses" 
              element={
                <ProtectedRoute>
                  <CourseListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/:id" 
              element={
                <ProtectedRoute>
                  <CourseDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-course" 
              element={
                <ProtectedRoute>
                  <CreateCoursePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-course/:id" 
              element={
                <ProtectedRoute>
                  <EditCoursePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/students" 
              element={
                <ProtectedRoute>
                  <StudentListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/students/:id" 
              element={
                <ProtectedRoute>
                  <StudentDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;