import React, { useEffect, useState } from 'react';
import { getSavedRecipes } from '../api/recipes';
import { useSelector } from 'react-redux';

function FavoritesPage( recipe ) {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const { data } = useSelector((state) => state.auth);  
    const userId = data.data._id;
    const token = data.data.token
  
  

  async  function fetchSavedRecipes() {
    try {
        const recipes = await getSavedRecipes(userId,token); 
        console.log(`rrr`,recipes)
        setSavedRecipes(recipes);
    } catch (error) {
        console.error('Failed to fetch saved recipes', error);
    }
};  



const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;  
  };

useEffect(() => {
        fetchSavedRecipes();
    }, []);

    return (
      <div className='w-full lg:max-w-[1240px] lg:mx-auto py-20 px-6 lg:px-0'>
      <h1 className='mt-8 text-2xl font-semibold'>Your Favorite Recipes</h1>
      
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-stretch '>
          {savedRecipes.map((recipe) => (
               <div className="bg-white rounded-lg mt-3 shadow-md overflow-hidden h-full  " key={recipe.recipe.recipeTitle}>
               <img src={recipe.recipe.imageUrl} alt={recipe.recipe.recipeTitle} className="w-full h-56 object-cover" />
               <div className="p-6 flex flex-col gap-5 justify-between">
                 <h5 className="lg:text-2xl md:text-xl text-lg font-semibold">{recipe.recipe.recipeTitle}</h5>
                 <p>{truncateText(recipe.recipe.recipeOverview, 14)}</p>
                 {/* <Link key={recipe._id} to={/recipes/${recipe._id}}>
                   <button className="rounded border border-DarkGreen bg-DarkGreen py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-DarkGreen hover:border-LightGreen">
                     View Recipe
                   </button>
                 </Link> 
                         */}
                         <div className=' flex gap-4'>
                         <button className="rounded border border-DarkGreen bg-DarkGreen py-3 px-8 text-base font-medium  leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-DarkGreen hover:border-LightGreen">
            View Recipe
          </button>
         
          </div>
               </div>
             </div>
          ))}
      </ul>
  </div>
    );
}


//src={recipe.recipe.imageUrl}
// {recipe.recipe.recipeOverview}
// {recipe.recipe.recipeTitle}

export default FavoritesPage;