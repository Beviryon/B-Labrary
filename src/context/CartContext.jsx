import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Charger les livres du sac depuis localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Sauvegarder le sac dans localStorage à chaque changement
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart(prevCart => {
      if (!prevCart.find(item => item.title === book.title)) {
        return [...prevCart, book];
      }
      return prevCart;
    });
  };

  const removeFromCart = (bookTitle) => {
    setCart(prevCart => prevCart.filter(item => item.title !== bookTitle));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
