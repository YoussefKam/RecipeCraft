const express = require("express");
const router = express.Router();
router.use(express.json());
// const multer = require("multer");
// const diskStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     const filename = `recipe-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   const imageType = file.mimetype.split("/")[0];
//   if (imageType === "image") {
//     return cb(null, true);
//   } else {
//     return cb("must be an image", false);
//   }
// };

// const upload = multer({
//   storage: diskStorage,
//   fileFilter,
// });
// const cloudinary = require('../utils/cloudinary');

const upload = require("../Middlewares/upload");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../utils/cloudinary");

const mongoose = require("mongoose");
require("dotenv").config();
const Recipe = require("../models/recipe.model");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middlewares/auth.middleware");

// Get All Recipes
router.get("/", async (req, res) => {
  try {
    // getting all recipes
    const recipes = await Recipe.find(
      {},
      "recipeTitle imageUrl recipeOverview"
    );
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/findById/:recipeId", async (req, res) => {
  const reqRecipeId = req.params.recipeId;

  try {
    const recipe = await Recipe.findById(reqRecipeId, {
      publicId: 0,
      updatedAt: 0,
      __v: 0,
    });

    // Check if recipe exists
    if (!recipe) {
      return res.status(404).json({ error: "Recipe Not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/add", async (req, res) => {
//   try {
//     const { recipeTitle, recipeOverview, instructions, ingredients } = req.body;
//     const ingredientsArray = Array.isArray(ingredients)
//       ? ingredients
//       : ingredients.split(","); // Split ingredients string into an array

//     // Check if any required attribute is missing or empty
//     if (!recipeTitle || !recipeOverview || !ingredients || !instructions) {
//       console.log(req.body);
//       throw new Error("All attributes must be provided.");
//     }
//     const recipe = new Recipe({
//       recipeTitle,
//       recipeOverview,
//       ingredients,
//       instructions,
//     });
//     const newRecipe = await recipe.save();

//     res.status(200).json({
//       status: "Recipe Added successfully",
//       data: { newRecipe },
//     });
//   } catch (error) {
//     console.error("Adding Recipe Failed", error);
//     res
//       .status(400)
//       .json({ error: "Adding Recipe Failed", message: error.message });
//   }
// });

// router.post("/image/:id", upload.single("recipeImage"), async (req, res) => {
//   try {
//     // Upload Image to Cloudinary
//     const data = await uploadToCloudinary(req.file.path, "recipe-images");
//     // Save Image Url and publicId to the database
//     const savedImg = await Recipe.updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           imageUrl: data.url,
//           publicId: data.public_id,
//         },
//       }
//     );
//     console.log(data);
//     res.status(200).send("Recipe image uploaded successfully!");
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(400).send("Error uploading image: " + error.message);
//   }
// });

router.post("/add", upload.single("recipeImage"), async (req, res) => {
  try {
    // Extract data from the request body
    const {
      recipeTitle,
      recipeOverview,
      instructions,
      ingredients,
      youtubeUrl,
      PreparationTime,
      Protein,
      Carbs,
      Calories,
      Fats,
    } = req.body;

    // Split ingredients string into an array
    const ingredientsArray = Array.isArray(ingredients)
      ? ingredients
      : ingredients.split(",");

    // Check if any required attribute is missing or empty
    if (!recipeTitle || !recipeOverview || !instructions || !req.file) {
      throw new Error("All attributes must be provided.");
    }

    // Upload Image to Cloudinary
    const data = await uploadToCloudinary(req.file.path, "recipe-images");
    // Create a new recipe document
    const recipe = new Recipe({
      recipeTitle,
      recipeOverview,
      ingredients,
      instructions,
      youtubeUrl,
      PreparationTime,
      Protein,
      Carbs,
      Calories,
      Fats,
      imageUrl: data.url,
      publicId: data.public_id,
    });
    const newRecipe = await recipe.save();

    res.status(200).json({
      status: "Recipe Added successfully",
      data: { newRecipe },
    });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res
      .status(400)
      .json({ error: "Error adding recipe", message: error.message });
  }
});

router.get("/search", async (req, res) => {
  const { recipeTitle, ingredients } = req.query;
  try {
    let query = {};
    // If recipeTitle is provided, add it to the query
    if (recipeTitle) {
      query.recipeTitle = { $regex: recipeTitle, $options: "i" }; // Case-insensitive search
    }

    // If ingredient is provided, add it to the query
    if (ingredients) {
      query.ingredients = { $regex: ingredients, $options: "i" }; // Case-insensitive search for ingredients
    }

    const recipes = await Recipe.find(query);
    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.log("cannot find recipe");
    res.status(500).json(error.message);
  }
});

// Edit Recipe Info
router.patch(
  "/editRecipe/:recipeId",
  upload.single("recipeImage"),
  async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
      const {
        recipeTitle,
        recipeOverview,
        ingredients,
        instructions,
        youtubeUrl,
        PreparationTime,
        Protein,
        Carbs,
        Calories,
        Fats,
      } = req.body;

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      if (recipeTitle) recipe.recipeTitle = recipeTitle;
      if (recipeOverview) recipe.recipeOverview = recipeOverview;
      if (ingredients) recipe.ingredients = ingredients;
      if (instructions) recipe.instructions = instructions;
      if (youtubeUrl) recipe.youtubeUrl = youtubeUrl;
      if (PreparationTime) recipe.PreparationTime = PreparationTime;
      if (Protein) recipe.Protein = Protein;
      if (Carbs) recipe.Carbs = Carbs;
      if (Fats) recipe.Fats = Fats;
      if (Calories) recipe.Calories = Calories;
      if (req.file) {
        // Upload Image to Cloudinary
        const data = await uploadToCloudinary(req.file.path, "recipe-images");
        recipe.imageUrl = data.url;
        recipe.publicId = data.public_id;
      }

      await recipe.save();
      res.json({ message: "Recipe updated successfully", data: { recipe } });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  }
);

module.exports = router;
