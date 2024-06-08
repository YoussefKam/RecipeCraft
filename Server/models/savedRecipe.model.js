const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const savedRecipeSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    recipe: {
      type: ObjectId,
      ref: "Recipe",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("savedRecipes", savedRecipeSchema);
