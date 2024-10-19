import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import leftLogo from '../assets/logo2.jpg'; 
import rightLogo from '../assets/logo1.jpg'; 

const Header = () => {
  const { cart } = useCart();
  const [navOpen, setNavOpen] = useState(false);
  
  // Récupérer les informations de l'utilisateur connecté
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const profilePicture = userData?.profilePicture || 'url_to_default_picture'; // Remplacez par l'URL d'une image par défaut

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      {/* Left Logo */}
      <div className="logo left-logo">
        <img src={leftLogo} alt="Left Logo" />
      </div>

      {/* Navigation */}
      <nav className={`nav-center ${navOpen ? 'nav-open' : ''}`}>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/books">Bibliothèque</Link></li>
          <li className="cart-link">
            <Link to="/cart">
              Classeur <span className="cart-count">{cart.length}</span>
            </Link>
          </li>
          <li><Link to="/profile">Profil</Link></li>
        </ul>
      </nav>

      {/* Photo de Profil */}
      {userData && (
        <div className="profile-icon">
          <Link to="/profile">
            <img src={profilePicture} alt="Profile" className="navbar-profile-picture" />
          </Link>
        </div>
      )}

      {/* Right Logo */}
      <div className="logo right-logo">
        <img src={rightLogo} alt="Right Logo" />
      </div>

      {/* Mobile menu toggle */}
      <div className="nav-toggle" onClick={toggleNav}>
        ☰
      </div>
    </header>
  );
};

export default Header;
