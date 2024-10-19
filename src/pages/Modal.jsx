import './Modal.css'; 
import { useNavigate } from 'react-router-dom'; 

const Modal = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    onClose(); 
    navigate('/register');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Message</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onClose}>Fermer</button>
          {message.includes('connecter') && (
            <button onClick={handleSignupRedirect}>S'inscrire</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
