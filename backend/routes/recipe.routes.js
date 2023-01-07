const express = require("express");
const RecipeController = require('../controllers/recipe.controller');
const router = express.Router()

router
    .route('/')
    .get(RecipeController.getAllRecipes)
    .post(RecipeController.addRecipe)

router
    .route('/:recipeId')
    .get(RecipeController.detailsById)
    .patch(RecipeController.editById)

module.exports = router;