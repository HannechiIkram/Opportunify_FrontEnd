import React, { createContext, useContext, useState } from 'react';

// Crée un contexte utilisateur
const UserContext = createContext();

// Fournit des données utilisateur et une fonction pour mettre à jour l'utilisateur
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Utilitaire pour obtenir des données utilisateur depuis le contexte
export const useUser = () => {
  return useContext(UserContext);
};
