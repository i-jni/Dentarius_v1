import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CourseListPage from '../pages/CourseListPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import CreateCoursePage from '../pages/CreateCoursePage';
import StudentListPage from '../pages/StudentListPage';
import StudentDetailPage from '../pages/StudentDetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import MentionsPage from '../pages/MentionsPage';
import ConfidentialitePage from '../pages/ConfidentialitePage';

const AppRoutes = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/courses" element={<CourseListPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/create-course" element={<CreateCoursePage />} />
            <Route path="/students" element={<StudentListPage />} />
            <Route path="/students/:id" element={<StudentDetailPage />} />
            <Route path="/mentions-legales" element={<MentionsPage />} />
            <Route path="/confidentialite" element={<ConfidentialitePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;