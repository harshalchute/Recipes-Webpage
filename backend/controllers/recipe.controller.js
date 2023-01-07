const recipeModel = require('../models/recipe.model');
const RecipeModel = require('../models/recipe.model');
const userModel = require('../models/user.model');

class RecipeController {

    addRecipe = async (req, res) => {
        console.log(req.body);
        const { name, category, steps, description, ingredients, imageURL } = req.body;
        try {
            const details = {
                name,
                category,
                steps,
                description,
                ingredients,
                imageURL
            };
            const recipe = new RecipeModel(details);
            recipe.save(((error, _recipe) => {
                if (error) return res.status(400).json({ success: false, message: 'Recipe Create Error!', error });
                if (_recipe) {
                    return res.status(200).json({ success: true, message: 'Recipe has been create successfuly.', details: _recipe });
                }
            }));
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    };

    getAllRecipes = async (req, res) => {
        try {
            const data = await recipeModel.find({})
            if (!data) return res.status(400).json({ message: 'Recipes fetched failed!' })
            res.status(200).json({ success: true, message: 'Recipes fetched Successfully.', _recipes: data })
        } catch (error) {
            return res.status(400).json({ message: 'Something went wrong!' })
        }
    };

    detailsById = async (req, res) => {
        console.log(req.params.recipeId);
        try {
            const data = await recipeModel.findById(req.params.recipeId)
            if (!data) return res.status(400).json({ message: 'Details fetched failed!' })
            res.json({ success: true, message: 'Details fetched Successfully.', _details: data })
        } catch (error) {
            return res.status(400).json({ message: 'Something went wrong!' })
        }
    };

    editById = async (req, res) => {
        console.log(req.params.recipeId);
        const { name, category, steps, description, ingredients, imageURL } = req.body;
        try {
            const editDetails = {
                name,
                category,
                steps,
                description,
                ingredients,
                imageURL
            };
            let updateRecipe = recipeModel.findByIdAndUpdate(req.params.recipeId, editDetails);
            updateRecipe.exec((error) => {
                if (error) return res.status(400).json({ success: false, message: 'Recipe Edit Error!', error });
                return res.status(200).json({ success: true, message: 'Recipe has been Edited successfuly.' });
            });
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    };

}

module.exports = new RecipeController;
