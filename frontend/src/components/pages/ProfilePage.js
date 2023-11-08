import React, { useState, useEffect } from 'react';
import ProfileHeader from '../Header/ProfileHeader';
import './ProfilePage.css';

function ProfilePage() {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritedRecipes, setFavoritedRecipes] = useState(() => {
    const savedFavorites = localStorage.getItem('favoritedRecipes');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const loggedInUserId = 27;
  const currentRecipe = recipes[currentRecipeIndex];

  const apiUrl = process.env.REACT_APP_API_URL || ''; // Fallback to an empty string if the variable is not set

  const saveFavoriteToDatabase = async (recipe) => {
    const payload = {
      userId: loggedInUserId,
      recipeId: parseInt(recipe.idMeal, 10),
      recipeName: recipe.strMeal,
      recipeImage: recipe.strMealThumb,
    };

    console.log("Saving to favorites:", payload);

    try {
      const response = await fetch(`${apiUrl}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        if (response.status === 400 && errorBody.error === "Recipe already favorited") {
          console.log("Recipe already favorited");
        } else {
          throw new Error(`Failed to save favorite: ${response.status} ${errorBody.error}`);
        }
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  const handleFavorite = (recipe) => {
    let updatedFavorites;
    if (favoritedRecipes.includes(recipe.idMeal)) {
      updatedFavorites = favoritedRecipes.filter(id => id !== recipe.idMeal);
      deleteFavoriteFromDatabase(recipe.idMeal); // Remove from favorites in the database
    } else {
      updatedFavorites = [...favoritedRecipes, recipe.idMeal];
      saveFavoriteToDatabase(recipe); // Save to favorites in the database
    }
    setFavoritedRecipes(updatedFavorites);
    localStorage.setItem('favoritedRecipes', JSON.stringify(updatedFavorites));
  };

  const deleteFavoriteFromDatabase = async (recipeId) => {
    try {
      const response = await fetch(`${apiUrl}/api/favorites/${loggedInUserId}/${recipeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log("Recipe not found in favorites");
        } else {
          const errorBody = await response.json();
          throw new Error(`Failed to remove favorite: ${response.status} ${errorBody.error}`);
        }
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/fetch-data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data);
        setRecipes(data.meals);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, [apiUrl]);

  const showNextRecipe = () => {
    if (currentRecipeIndex < recipes.length - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1);
    }
  };

  const showPreviousRecipe = () => {
    if (currentRecipeIndex > 0) {
      setCurrentRecipeIndex(currentRecipeIndex - 1);
    }
  };

  const handleSearch = () => {
    console.log("Current Search Term:", searchTerm);
    fetch(`${apiUrl}/api/fetch-data?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Recipes Data:", data);
        setRecipes(data.meals || []);
      })
      .catch(error => {
        console.error('Error fetching recipes', error);
      });
  };

  return (
    <div className="page-container">
      <ProfileHeader />
      <h2>Recipes</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="main-content">
        <div className="recipe-wrapper">
          <button className="arrow-btn prev-recipe-btn" onClick={showPreviousRecipe}>&larr;</button>
          <div id="recipeContainer">
            {currentRecipe && (
              <div className="recipe">
                <span
                  className={favoritedRecipes.includes(currentRecipe.idMeal) ? 'heart favorited' : 'heart'}
                  onClick={() => handleFavorite(currentRecipe)}
                >
                  ❤️
                </span>
                <img src={currentRecipe.strMealThumb} alt={currentRecipe.strMeal} />
                <h3>{currentRecipe.strMeal}</h3>
                <p><strong>Category:</strong> {currentRecipe.strCategory}</p>
                <p><strong>Cuisine:</strong> {currentRecipe.strArea}</p>
                <h4>Ingredients:</h4>
                <ul>
                  {Object.keys(currentRecipe).filter(key => key.startsWith("strIngredient") && currentRecipe[key]).map((key, index) => (
                    <li key={index}>{currentRecipe[key]} - {currentRecipe[`strMeasure${index + 1}`]}</li>
                  ))}
                </ul>
                <p>{currentRecipe.strInstructions}</p>
                {currentRecipe.strYoutube && <a href={currentRecipe.strYoutube} target="_blank" rel="noopener noreferrer">Watch Video</a>}
              </div>
            )}
          </div>
          <button className="arrow-btn next-recipe-btn" onClick={showNextRecipe}>&rarr;</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
















