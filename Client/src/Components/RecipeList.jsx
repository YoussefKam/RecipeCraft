import React from 'react';
import { Link } from 'react-router-dom';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes }) => {
  return (
    <div className="w-full lg:max-w-[1240px] lg:mx-auto py-20 px-6 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-stretch">
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
            <RecipeItem recipe={recipe} />
          </Link>
        ))
      ) : (
        <p className="text-center col-span-full">No recipes found</p>
      )}
    </div>
  );
};

export default RecipeList;