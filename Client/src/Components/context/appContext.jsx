import React, { createContext, useContext, useState } from 'react';

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (recipe) => {
    setFavorites((prevFavorites) => [...prevFavorites, recipe]);
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(recipe => recipe._id !== recipeId));
  };

  return (
    <AppContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
