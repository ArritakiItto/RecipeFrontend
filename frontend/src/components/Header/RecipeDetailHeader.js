// FavoritesHeader.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authcontext';
import './FavoritesHeader.css';

function RecipeDetailHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="favorites-header">
      <div className="menu-container">
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
            <button onClick={() => navigate('/favorites')}>Favorites</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default RecipeDetailHeader;