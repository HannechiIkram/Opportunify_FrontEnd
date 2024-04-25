import { Navigate } from 'react-router-dom';
import { useUser } from './usercontext';

const ProtectedRoute = ({ element, requiredRoles = [] }) => {
  const { user } = useUser();

  if (!user) {
    // Redirigez vers la page de connexion si aucun utilisateur n'est connecté
    return <Navigate to="/sign-in" replace />;
  }

  const userRole = user.role;

  // Si le rôle de l'utilisateur n'est pas dans les rôles requis, rediriger vers "unauthorized"
  const hasRequiredRole = requiredRoles.includes(userRole);
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element; // L'utilisateur a le rôle requis, retournez l'élément sécurisé
};

export default ProtectedRoute;
