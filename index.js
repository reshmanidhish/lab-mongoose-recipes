const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(data);
  })
  .then((recipes) => {
    console.log(" Data was added ");
    recipes.forEach((recipe) => {
      console.log(`- Title: ${recipe.title}`);
    });
  })
  .then(() => {
    // Add recipe documents from data.json using insertMany
    return Recipe.insertMany(data);
  })
  .then((newrecipes) => {
    console.log(`Added new recipes to the database.`);
    newrecipes.forEach((newrecipe) => {
      console.log(`- Title: ${newrecipe.title}`);
    });
  })
  .then(() => {
    return recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log(' removed "Carrot Cake" recipe from the database.');
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Database connection closed.");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
