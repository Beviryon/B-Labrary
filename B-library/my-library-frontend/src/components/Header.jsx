import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import leftLogo from '../assets/logo2.jpg'; 
import rightLogo from '../assets/logo1.jpg'; 

const Header = () => {
  const { cart } = useCart();
  const [navOpen, setNavOpen] = useState(false);

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
        </ul>
      </nav>

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
