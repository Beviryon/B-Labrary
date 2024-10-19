import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import CollaboratePage from './pages/CollaboratePage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';

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
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={() => <h1>Page non trouvée</h1>} />
              {/* <Route path="/books" element={<ProtectedRoute><BookListPage /></ProtectedRoute>} /> */}

            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
    
  );
}

export default App;
