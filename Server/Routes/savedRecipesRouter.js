const router = require("express").Router();
const SavedRecipe = require("../models/savedRecipe.model");
const mongoose = require("mongoose");
const Recipe = require("../models/recipe.model");
const User = require("../models/user.model");
const verifyToken = require("../Middlewares/auth.middleware");

//This is the route for saving a recipe in saved Recipes
router.post("/", verifyToken, async (req, res) => {
  try {
    const { recipe, user } = req.body;

    const savRecipe = await Recipe.findOne({ _id: recipe });
    if (!savRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const Owner = await User.findOne({ _id: user });
    if (!Owner) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingFavorite = await SavedRecipe.findOne({
      recipe: savRecipe._id,
      user: Owner._id,
    });

    if (existingFavorite) {
      // If the recipe is already saved, return a 400 Bad Request response
      return res
        .status(400)
        .json({ error: "Recipe already saved as favorite" });
    }

    // Create a new SavedRecipe document and save it to the database
    const newFavorite = await SavedRecipe.create({
      recipe: savRecipe._id,
      user: Owner._id,
    });

    // Return the newly created SavedRecipe document as a JSON response
    res.status(201).json(newFavorite);

    // if (savedRecipe) res.status(201).json(savedRecipe);
  } catch (error) {
    // Handle errors
    console.error("Error saving recipe as favorite:", error);
    res.status(500).json({
      error: "Failed to save recipe as favorite",
      message: error.message,
    });
  }
});

//Route for viewing saved Recipes that show the userName & all recipe attributes
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    // const id = req.params.id;
    const savRecipe = await SavedRecipe.find({ user: req.params.userId })
      .populate({
        path: "recipe",
        select: "recipeTitle recipeOverview ingredients imageUrl",
      })
      .populate({ path: "user", select: "userName" });
    res.status(200).json(savRecipe);
  } catch (error) {
    console.log("Cannot find Saved Recipes", error);
    res.status(500).json({
      error: "Cannot find Saved Recipes",
      message: error.message,
    });
  }
});

module.exports = router;
