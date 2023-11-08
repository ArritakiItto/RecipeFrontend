import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoritesHeader from '../Header/FavoritesHeader';
import './FavoritesPage.css';

function FavoritesPage() {
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const loggedInUserId = 27;
  const apiUrl = process.env.REACT_APP_API_URL || ''; // Fallback to an empty string if the variable is not set

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/user/${loggedInUserId}/favorites`);
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        setFavoritedRecipes(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [loggedInUserId, apiUrl]);

  return (
    <div className="favorites-container">
      <FavoritesHeader />
      <h2>Favorited Recipes</h2>
      <div className="favorites-grid">
        {favoritedRecipes.map(recipe => (
          <Link to={`/recipe/${recipe.recipe_id}`} key={recipe.recipe_id}> {/* Update the 'to' attribute */}
            <div className="recipe-card">
              <img
                src={recipe.recipe_image}
                alt={recipe.recipe_name}
                className="recipe-image"
              />
              <div className="recipe-name">{recipe.recipe_name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;









