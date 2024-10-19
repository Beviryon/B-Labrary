import { createContext, useState, useContext } from 'react';

// Crée le contexte
const AuthContext = createContext();

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

const usersData = [
  {
    id: 1,
    username: "utilisateur1",
    password: "motdepasse1",
    email: "utilisateur1@example.com"
  },
  {
    id: 2,
    username: "utilisateur2",
    password: "motdepasse2",
    email: "utilisateur2@example.com"
  },
  {
    id: 3,
    username: "utilisateur3",
    password: "motdepasse3",
    email: "utilisateur3@example.com"
  },
  {
    id: 4,
    username: "utilisateur4",
    password: "motdepasse4",
    email: "utilisateur4@example.com"
  },
  {
    id: 5,
    username: "utilisateur5",
    password: "motdepasse5",
    email: "utilisateur5@example.com"
  }
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    // Recherche dans les utilisateurs fictifs
    const user = usersData.find(user => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      return true; // Connexion réussie
    }
    return false; // Échec de la connexion
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
