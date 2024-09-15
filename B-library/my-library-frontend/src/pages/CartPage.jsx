import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="page cart-page">
      <h2>Votre sac</h2>
      <div className="book-list">
        {cart.map((book, index) => (
          <div key={index} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>Status: {book.available ? 'Disponible' : 'Non disponible'}</p>
            <p className="readers">Lecteurs: {book.readers}</p>
            <a href={book.pdf} target="_blank" rel="noopener noreferrer">
              <button>
                Lire PDF
              </button>
            </a>
            <button onClick={() => removeFromCart(book.title)}>Retirer du sac</button>
          </div>
        ))}
        {cart.length === 0 && <p>Votre sac est vide.</p>}
      </div>
    </div>
  );
};

export default CartPage;
