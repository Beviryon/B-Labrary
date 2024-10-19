import { useState } from 'react';
import './UserProfile.css'; 
const ProfilePage = () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const [name, setName] = useState(userData?.name || '');
    const [email, setEmail] = useState(userData?.email || '');
    const [profilePicture, setProfilePicture] = useState(userData?.profilePicture || '');

    if (!userData) {
        return <p>Aucun utilisateur connecté. Veuillez vous connecter.</p>; // Gérer le cas où il n'y a pas d'utilisateur connecté
    }

    // Obtenir le nombre de livres dans le classeur de l'utilisateur
    const userBooks = JSON.parse(localStorage.getItem('users')).find(user => user.email === userData.email)?.cart || [];
    const numberOfBooks = userBooks.length;

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        const updatedUser = { ...userData, name, email, profilePicture };

        // Mettre à jour les utilisateurs dans le localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map(user => user.email === userData.email ? updatedUser : user);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Mettre à jour l'utilisateur courant dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        alert('Informations mises à jour avec succès !');
    };

    return (
        <div className="profile-page">
            <h2>Profil de l'utilisateur</h2>
            <div className="profile-info">
                <img 
                    src={profilePicture || 'url_to_default_picture'} 
                    alt="Photo de profil" 
                    className="profile-picture"
                />
                <div className="profile-details">
                    <p><strong>Nom :</strong> 
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </p>
                    <p><strong>Email :</strong> 
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </p>
                    <p><strong>Nombre de livres dans le classeur :</strong> {numberOfBooks}</p>
                    <div className="profile-picture-upload">
                        <label>Changer la photo de profil :</label>
                        <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                    </div>
                    <button onClick={handleSaveChanges}>Sauvegarder les changements</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
