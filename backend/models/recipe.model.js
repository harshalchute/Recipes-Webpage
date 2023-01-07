const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        require
    },
    category: {
        type: String,
        require
    },
    steps: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: Object,
        // name: { type: String },
        // quantity: { type: String },
        // "type": { type: String }
    },
    imageURL: {
        type: String
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('recipe', recipeSchema)