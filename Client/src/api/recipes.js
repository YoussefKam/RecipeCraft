// src/api/recipes.js
export async function addRecipeToFavorites(recipeId, userId, token) {
    try {
      const response = await fetch('https://fridge-craft-server.vercel.app/api/savedRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipe: recipeId, user: userId })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add recipe to favorites'); // More specific error message can be added based on response
      }
  
      // Handle successful response (optional)
      // console.log('Recipe added to favorites successfully!');
  
    } catch (error) {
      console.error('Error:', error);
      // Consider providing user-friendly error messages here
    }
  }
  

export async function getSavedRecipes(userId, token) {
try {
    const response = await fetch(`https://fridge-craft-server.vercel.app/api/savedRecipes/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch saved recipes');
    }

    const data = await response.json();
    return data;
} catch (error) {
    console.error('Error:', error);
     alert(error.message)
}
}