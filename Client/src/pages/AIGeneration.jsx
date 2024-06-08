import React, { useState, useEffect } from 'react';
import '../index.css';
import RecipeItem from '../Components/RecipeItem';

const AIGeneration = () => {
  const [ingredients, setIngredients] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const handleChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = async () => {
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation",
        {
          headers: {
            Authorization: "Bearer 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",
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ inputs: ingredients }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.error}`);
      }

      const data = await response.json();
      setResult(parseResult(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseResult = (data) => {
    const resultText = data[0]?.generated_text || '';
    const ingredientsIndex = resultText.toLowerCase().indexOf('ingredients');
    const directionsIndex = resultText.toLowerCase().indexOf('directions');

    let title = '';
    let ingredients = '';
    let directions = '';

    if (ingredientsIndex !== -1) {
      title = resultText.slice(0, ingredientsIndex).trim();
      if (directionsIndex !== -1) {
        ingredients = resultText.slice(ingredientsIndex, directionsIndex).trim();
        directions = resultText.slice(directionsIndex).trim();
      } else {
        ingredients = resultText.slice(ingredientsIndex).trim();
      }
    } else {
      title = resultText;
    }
    title = title.replace(/^title:?\s*/i, '');
    ingredients = ingredients.replace(/^ingredients:?\s*/i, '');
    directions = directions.replace(/^directions:?\s*/i, '');

    // Add line breaks after each period in directions
    directions = directions.split('. ').join('.\n');

    // Add line breaks before each number in ingredients except the first number
    ingredients = ingredients.replace(/([^\n\d])(\d)/g, '$1\n$2');

    return { title, ingredients, directions };
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://fridge-craft-server.vercel.app/api/recipes');
      const data = await response.json();
      setRecipes(getRandomRecipes(data, 3)); // Select 3 random recipes
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    }
  };

  const getRandomRecipes = (recipes, count) => {
    let shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-20 lg:mx-auto px-6 lg:px-0 ">
      <div className="w-full lg:max-w-[1240px] p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Recipe Generator</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients"
            className="flex-grow px-3 py-2 mt-1 text-gray-700 border rounded py-3 focus:outline-none"
          />
          <button onClick={handleSubmit} className="rounded border border-DarkGreen bg-DarkGreen py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-DarkGreen hover:border-LightGreen">
            Submit
          </button>
        </div>
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="spinner"></div>
          </div>
        )}
        {result && (
          <div className="p-4 mt-4 bg-green-100 border border-green-200 rounded-md">
            <h2 className="text-2xl font-semibold text-green-800">{result.title}</h2>
            <h3 className="text-xl font-semibold text-green-700 mt-4">Ingredients</h3>
            <p className="mt-2 text-green-700 whitespace-pre-wrap break-words">{result.ingredients}</p>
            <h3 className="text-xl font-semibold text-green-700 mt-4">Directions</h3>
            <p className="mt-2 text-green-700 whitespace-pre-wrap break-words">{result.directions}</p>
          </div>
        )}
        {error && (
          <div className="p-4 mt-4 bg-red-100 border border-red-200 rounded-md">
            <h2 className="text-xl font-semibold text-red-800">Error</h2>
            <pre className="mt-2 text-red-700 whitespace-pre-wrap break-words">{error}</pre>
          </div>
        )}
      </div>
      <div className="w-full lg:max-w-[1240px] max-w-4xl p-8 mt-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900">Recipes You May Like</h2>
        <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-stretch">
          {recipes.map(recipe => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIGeneration;
