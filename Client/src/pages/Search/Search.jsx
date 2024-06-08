// Search.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../Components/SearchBar';
import RecipeList from '../../Components/RecipeList';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query');
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      fetchRecipes();
    }
  }, [location.search]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('https://fridge-craft-server.vercel.app/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery.trim() === '') {
      fetchRecipes();
      return;
    }

    try {
      const response = await axios.get('https://fridge-craft-server.vercel.app/api/recipes/search', {
        params: { recipeTitle: searchQuery }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-DarkGreen py-20 gap-10 flex flex-col">
        <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold text-white text-center">
          Recipe Search
        </h2>
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      </div>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Search;
