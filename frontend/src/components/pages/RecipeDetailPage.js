import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import RecipeDetailHeader from '../Header/RecipeDetailHeader';
import './RecipeDetailPage.css';

function RecipeDetailPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe details using the recipeId
    const fetchRecipeDetails = async () => {
      try {
        console.log("Fetching recipe details for recipeId:", recipeId);

        // Make an API request to get recipe details
        const response = await axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`);
        console.log("Response status:", response.status);

        if (!response.data.meals || response.data.meals.length === 0) {
          throw new Error('Recipe not found');
        }

        const fetchedRecipe = response.data.meals[0];
        console.log("Fetched Recipe Data:", fetchedRecipe);

        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);


  return (
    <div>
      <h2>Recipe Detail Page</h2>
      <RecipeDetailHeader />
      <p className="ID-text">Recipe ID: {recipeId}</p>
      {/* Display recipe details here */}
      {recipe && (
        <div className="recipe-text">
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p><strong>Category:</strong> {recipe.strCategory}</p>
          <p><strong>Cuisine:</strong> {recipe.strArea}</p>
          <h4>Ingredients:</h4>
          <ul>
            {Object.keys(recipe).filter(key => key.startsWith("strIngredient") && recipe[key]).map((key, index) => (
              <li key={index}>{recipe[key]} - {recipe[`strMeasure${index + 1}`]}</li>
            ))}
          </ul>
          <p>{recipe.strInstructions}</p>
          {recipe.strYoutube && <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">Watch Video</a>}
        </div>
      )}
    </div>
  );
}

export default RecipeDetailPage;

