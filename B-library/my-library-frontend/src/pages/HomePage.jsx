import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bookCover1 from '../assets/bookCover1.png';
import bookCover2 from '../assets/bookCover2.png';
import bookCover3 from '../assets/bookCover3.png';
import backgroundImage from '../assets/background.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  // Fonction pour rediriger vers la page de la liste des livres
  const handleBookClick = () => {
    navigate('/books');
  };

  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <div className="welcome-section">
        <h2>Une plateforme de documentation en sciences de l'éducation et de la formation pour les chercheurs et chercheuses de la Chaire UNESCO de l'ENS à l'université Marien Ngouabi de Brazzaville.</h2>
        <Link to="/books">
          <button>Explorer la bibliothèque</button>
        </Link>
      </div>

      <div className="featured-books">
        <h3>Livres en vedette</h3>
        <div className="book-list">
          <div className="book-card" onClick={handleBookClick}>
            <img src={bookCover1} alt="Book 1" />
            <h4>Book 1</h4>
            <p>Description du livre 1</p>
          </div>
          <div className="book-card" onClick={handleBookClick}>
            <img src={bookCover2} alt="Book 2" />
            <h4>Book 2</h4>
            <p>Description du livre 2</p>
          </div>
          <div className="book-card" onClick={handleBookClick}>
            <img src={bookCover3} alt="Book 3" />
            <h4>Book 3</h4>
            <p>Description du livre 3</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Virtual Library. Tous droits réservés.</p>
        <ul>
          <li><Link to="/about">À propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/privacy">Confidentialité</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;
