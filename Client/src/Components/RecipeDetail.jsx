// RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import { Link } from "react-router-dom";


const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(`https://fridge-craft-server.vercel.app/api/recipes/findById/${recipeId}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const videoId = recipe.youtubeUrl ? extractVideoId(recipe.youtubeUrl) : null;

  return (
    <div>
      <div className="bg-DarkGreen py-20 gap-10 flex flex-col">
        <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold text-white text-center">
          Recipe Search
        </h2>
        <SearchBar query={query} setQuery={setQuery} />
        <div className='flex flex-row justify-center '>
        <Link to="/Search">
        <button className="rounded border border-White py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:border-White hover:bg-White hover:text-DarkGreen">
        Back
      </button>
      </Link>
        </div>
      </div>
      
      <div className="lg:max-w-[1240px] mx-auto bg-white rounded shadow-md p-10 my-20 flex flex-col gap-10">
        <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold">{recipe.recipeTitle}</h2>
        <img src={recipe.imageUrl} alt={recipe.recipeTitle} className="w-full lg:h-[550px] md:h-[400px] h-[250px] object-cover rounded" />
        <div className="flex flex-col gap-5">
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Overview</h3>
          <p className="text-lg">{recipe.recipeOverview}</p>
        </div>
        <div className="w-full border"></div>
        <div className="flex justify-between flex-wrap gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Ingredients</h3>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Nutrition Info</h3>
            <div className="flex gap-2">
              <p className="text-lg font-bold">Calories:</p>
              <p className="text-lg">{recipe.Calories}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-lg font-bold">Protein:</p>
              <p className="text-lg">{recipe.Protein}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-lg font-bold">Carbs:</p>
              <p className="text-lg">{recipe.Carbs}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-lg font-bold">Fats:</p>
              <p className="text-lg">{recipe.Fats}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Preparation Time</h3>
            <p className="text-lg">{recipe.PreparationTime}</p>
          </div>
        </div>
        <div className="w-full border"></div>
        <div className="flex flex-col gap-5">
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Instructions</h3>
          <p className="text-lg">{recipe.instructions}</p>
        </div>
        <div className="w-full border"></div>
        {videoId && (
          <div className="flex flex-col gap-5">
            <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Video Tutorial</h3>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;

