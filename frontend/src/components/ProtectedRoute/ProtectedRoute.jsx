import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { isAuthenticated, loading } = useAuthContext();

  // Attendre le chargement de l'authentification
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        <div>Chargement...</div>
      </div>
    );
  }

  // Si pas connecté → rediriger vers login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si connecté → afficher la page
  return children;
};

export default ProtectedRoute;