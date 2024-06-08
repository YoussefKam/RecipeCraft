// src/hooks/useSearchRecipes.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSearchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

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
      navigate('/search');
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return {
    recipes,
    query,
    setQuery,
    handleSearch,
  };
};

export default useSearchRecipes;
