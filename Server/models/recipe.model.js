const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    // photo: {
    //   type: String,
    //   required: true,
    //   default: "uploads/Profile.png",
    // },
    recipeTitle: {
      type: String,
      required: [true, "Title is required"],
    },
    // recipeDescription: {
    //   type: String,
    //   required: [true, "Description is required"],
    // },
    recipeOverview: {
      type: String,
      required: [true, "Overview is required"],
    },
    ingredients: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
      validate: {
        validator: function (ingredients) {
          return ingredients.length >= 3; // Ensure at least 3 ingredients
        },
        message: "At least three ingredients are required",
      },
      required: true,
    },
    instructions: {
      type: String,
      required: [true, "Instructions is required"],
    },
    publicId: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    youtubeUrl: {
      type: String,
      required: false,
    },
    PreparationTime: {
      type: String,
      required: false,
    },
    Protein: {
      type: String,
    },
    Carbs: {
      type: String,
    },
    Calories: {
      type: String,
    },
    Fats: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
