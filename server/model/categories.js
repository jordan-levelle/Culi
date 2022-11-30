const mongoose = require('mongoose');
const categoriesSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: 'Field is required.'
    },
    image: {
        type: String, 
        required: 'Field is required.'
    },
});

module.exports = mongoose.model('categories', categoriesSchema); 