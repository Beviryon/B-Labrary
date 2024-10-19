import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Vérification si les mots de passe correspondent
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Vérifier si l'email existe déjà dans le Local Storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some((user) => user.email === email);

    if (userExists) {
      alert("Cet email est déjà utilisé !");
      return;
    }

    // Ajouter le nouvel utilisateur
    const newUser = {
      email: email,
      password: password,
      readingList: [],  
      readLater: []       
    };

    // Sauvegarder l'utilisateur dans Local Storage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Redirection vers la page de connexion après l'inscription
    navigate('/login');
  };
  
  return (
    <div className="register-page-container">
      <div className="register-form-container">
        <h2>Inscription</h2>
        <form onSubmit={handleRegister}>
          <div className="register-form-group">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label>Confirmer le mot de passe :</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-submit-button">
            S'inscrire
          </button>
          <p>
            Déjà inscrit ? <a href="/login">Connecte-toi ici</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
