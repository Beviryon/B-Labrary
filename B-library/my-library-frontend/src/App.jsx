import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import CollaboratePage from './pages/CollaboratePage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BookListPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/collaborate" element={<CollaboratePage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
