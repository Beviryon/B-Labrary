
import { Navigate } from 'react-router-dom'; // Utilisé pour rediriger
import { useAuth } from '../context/AuthContext'; // Import du contexte d'authentification

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Récupère l'état d'authentification depuis le contexte

  // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Sinon, affiche les enfants (le contenu protégé)
  return children;
};

export default ProtectedRoute;
