// Routes.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authcontext'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './PrivateRoute';
import FavoritesPage from './pages/FavoritesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';

function RoutesComponent() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/login");
    } else if (!isLoggedIn && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile/:recipeId?" element={
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      } />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} /> 
    </Routes>
  );
}

export default RoutesComponent;




