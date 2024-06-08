const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(self), microphone=()" // Example policy, modify as needed
  );
  next();
});

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoutes = require("./Routes/userRouter");
const recipeRoutes = require("./Routes/recipeRouter");
const savedRecipesRoutes = require("./Routes/savedRecipesRouter");
const otpsRoutes = require("./Routes/otpRouter");
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`MongoDB Server Started `);

  // Create index on the 'recipeTitle' field
  mongoose.connection.db
    .collection("recipes")
    .createIndex({ recipeTitle: 1 }, (err, result) => {
      if (err) {
        console.error("Error creating index for recipeTitle:", err);
      } else {
        console.log("Index created for recipeTitle:", result);
      }
    });

  // Create index on the 'ingredients' field
  mongoose.connection.db
    .collection("recipes")
    .createIndex({ ingredients: 1 }, (err, result) => {
      if (err) {
        console.error("Error creating index for ingredients:", err);
      } else {
        console.log("Index created for ingredients:", result);
      }
    });
});

const port = process.env.PORT;

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/savedRecipes", savedRecipesRoutes);
app.use("/api/otps", otpsRoutes);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
