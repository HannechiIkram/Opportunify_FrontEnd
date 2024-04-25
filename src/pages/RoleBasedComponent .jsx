import React from 'react';
import { useUser } from '../context/usercontext';

const RoleBasedComponent = ({ requiredRoles, children }) => {
  const userContext = useUser();
  const user = userContext ? userContext.user : null;

  if (!user) {
    return <div>Chargement...</div>; // Attendre que le contexte soit prêt
  }

  const hasRequiredRole = requiredRoles.includes(user.role);

  if (hasRequiredRole) {
    return <>{children}</>;
  }

  return <div>Accès interdit</div>;
};

export default RoleBasedComponent;
