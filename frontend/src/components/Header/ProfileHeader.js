import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authcontext';
import './ProfileHeader.css';

function ProfileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="profile-header">
      <div className="menu-container">
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/favorites')}>Favorites</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default ProfileHeader;



