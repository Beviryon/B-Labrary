import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Récupérer les utilisateurs du Local Storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    const user = existingUsers.find((user) => user.email === username && user.password === password);

    if (user) {
      // Stocker les informations de l'utilisateur dans le Local Storage
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/profile'); // Rediriger vers la page de profil
    } else {
      setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
          <div className="login-form-group">
            <label>Nom d'utilisateur :</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="login-error-message">{errorMessage}</p>}
          <button type="submit" className="login-submit-button">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
