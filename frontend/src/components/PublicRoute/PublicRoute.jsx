import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PublicRoute = ({ children, redirectTo = '/' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <div>Chargement...</div>
      </div>
    );
  }

  // Si déjà connecté → rediriger vers accueil
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicRoute;