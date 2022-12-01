const express = require('express');
const router = express.Router();
const Controller = require('../controller/Controller')


router.get('/', Controller.home);
router.get('/Category', Controller.getCategories);
router.get('/about', Controller.getAbout_Culi);


//* Create
router.get('/create', Controller.getCreate_recipe);
router.post('/create', Controller.postCreate_recipe);


//* Contact
router.get('/contact', Controller.getContact_Culi);
router.post('/contact', Controller.postContact_Culi)


//* Get 
router.get('/recipe/:id', Controller.getRecipe);
router.get('/Category/:id', Controller.getCategoriesById);
router.get('/random', Controller.getRandom);


//* Search
router.post('/search', Controller.search_for_recipe);


//* Get:Delete Recipe
router.get('/allRecipes', Controller.allRecipes);
router.post('/recipe', Controller.deleteRecipe);


module.exports = router;