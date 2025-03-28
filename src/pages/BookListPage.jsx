import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookListPage.css';
import ReactPaginate from 'react-paginate';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Modal from './Modal';
import bookCover1 from '../assets/bookCover1.png';
import bookCover2 from '../assets/bookCover2.png';
import bookCover3 from '../assets/bookCover3.png';
import bookCover4 from '../assets/bookCover4.jpeg';
import bookCover5 from '../assets/bookCover5.jpeg';
import bookCover7 from '../assets/bookCover7.jpeg';
import bookPdf1 from '../assets/bookPdf1.pdf';
import bookPdf2 from '../assets/bookPdf2.pdf';
import bookPdf3 from '../assets/bookPdf3.pdf';
import bookPdf4 from '../assets/bookPdf4.pdf';
import bookPdf5 from '../assets/bookPdf5.pdf';
import bookPdf6 from '../assets/bookPdf6.pdf';
import bookPdf7 from '../assets/bookPdf7.pdf';
import bookPdf8 from '../assets/bookPdf8.pdf';
import placeholderImage from '../assets/placeholderImage.jpeg';

const books = [
  { title: 'Livre 1', description: 'Un excellent livre sur la Didactique.', image: bookCover1, pdf: bookPdf1, available: true, readers: 50, category: 'Didactiques' },
  { title: 'Livre 2', description: 'Un excellent livre sur la Sociologie.', image: bookCover2, pdf: bookPdf2, available: false, readers: 26, category: 'Sociologie' },
  { title: 'Livre 3', description: 'Un excellent livre sur la Psychologie.', image: bookCover3, pdf: bookPdf3, available: true, readers: 18, category: 'Psychologie' },
  { title: 'Livre 4', description: 'Un excellent livre sur la Didactique.', image: bookCover4, pdf: bookPdf4, available: false, readers: 12, category: 'Didactiques' },
  { title: 'Livre 5', description: 'Un excellent livre sur la Psychologie.', image: bookCover5, pdf: bookPdf5, available: true, readers: 8, category: 'Psychologie' },
  { title: 'Livre 6', description: 'Un excellent livre sur la Sociologie.', pdf: bookPdf6, available: false, readers: 82, category: 'Sociologie' },
  { title: 'Livre 7', description: 'Un excellent livre sur la Psychologie.', image: bookCover7, pdf: bookPdf7, available: true, readers: 428, category: 'Psychologie' },
  { title: 'Livre 8', description: 'Un excellent livre sur la Méthodologie de recherche.', pdf: bookPdf8, available: false, readers: 43, category: 'Méthodologie de recherche' },
];

const itemsPerPage = 8;

const BookListPage = () => {
  const { isAuthenticated } = useAuth(); // Utiliser le contexte d'authentification
  const { addToCart, cart } = useCart();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const categories = ['Tous', 'Didactiques', 'Sociologie', 'Psychologie', 'Méthodologie de recherche'];

  const filteredBooks = books
    .filter(book =>
      (selectedCategory === 'Tous' || book.category === selectedCategory) &&
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const offset = currentPage * itemsPerPage;
  const currentBooks = filteredBooks.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredBooks.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  const handleReadPDF = (book) => {
    if (!isAuthenticated) {
      setModalMessage('Veuillez vous connecter pour lire ce livre.');
      setShowModal(true);
      return;
    }

    if (!book.available) {
      setModalMessage('Livre non disponible, veuillez réessayer plus tard.');
      setShowModal(true);
      return;
    }

    window.open(book.pdf, '_blank');
  };

  const handleAddToCart = (book) => {
    if (!isAuthenticated) {
      setModalMessage('Veuillez vous connecter pour ajouter un livre à votre classeur.');
      setShowModal(true);
      return;
    }

    if (!book.available) {
      setModalMessage('Livre non disponible, veuillez réessayer plus tard.');
      setShowModal(true);
      return;
    }

    addToCart(book);
    setModalMessage('Livre ajouté dans le classeur !');
    setShowModal(true);

    // Ajouter à la liste de lecture plus tard
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = existingUsers.find((user) => user.email === localStorage.getItem('currentUser')); // Utiliser l'email de l'utilisateur connecté

    if (currentUser) {
      // Vérifier si le livre est déjà dans "lire plus tard"
      if (!currentUser.readLater.includes(book.title)) {
        currentUser.readLater.push(book.title);
        localStorage.setItem('users', JSON.stringify(existingUsers)); // Sauvegarder les modifications
      }
    }
  };

  const handleRedirectToSignup = () => {
    navigate('/register'); // Rediriger vers la page d'inscription
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="page">
      <h2>Livres disponibles</h2>
      <div className="book-page-container">
        {/* Colonne de gauche : Filtres */}
        <div className="filters-container">
          <div className="filters">
            <input
              type="text"
              placeholder="Recherche d’un livre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <h3>Catégories</h3>

            <select 
              className="category-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <ul className="categories">
              {categories.map((category, index) => (
                <li key={index}>
                  <button 
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'active' : ''}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colonne de droite : Liste des livres */}
        <div className="book-list-container">
          <div className="book-list">
            {currentBooks.map((book, index) => (
              <div key={index} className="book-card">
                <img 
                  src={book.image || placeholderImage} 
                  alt={book.title} 
                />
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>Status: {book.available ? 'Disponible' : 'Non disponible'}</p>
                <p className="readers">Lecteurs: {book.readers}</p>
                <button onClick={() => handleReadPDF(book)}>
                  {isAuthenticated ? 'Lire PDF' : 'Lecture'}
                </button>
                <button onClick={() => handleAddToCart(book)}>Lire plus tard</button>
              </div>
            ))}
          </div>

          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      </div>

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}

      <div className="cart-popup">
        <p>Livres dans le classeur: {cart.length}</p>
      </div>
    </div>
  );
};

export default BookListPage;
