const mongoose = require('mongoose');
const recipesSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: 'Field is required.'
    },
    description: {
        type: String, 
        required: 'Field is required.'
    },
    ingredients: {
        type: Array, 
        required: 'Field is required.'
    },
    category: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Everything in Between'], 
        required: 'Field is required.'
    },
    image: {
        type: String,
        require: 'Field is Required'
    }

});

recipesSchema.index({ "$**" : 'text'})
module.exports = mongoose.model('recipes', recipesSchema); 
