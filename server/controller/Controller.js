require('../model/database')
const categories = require('../model/categories');
const Recipe = require('../model/Recipe');
const Contact = require('../model/contact')



/* 
/ GET: Home Page
*/ 
exports.home = async(req, res) => {
    try {
        const limitCategories = 5;
        const category = await categories.find({}).limit(limitCategories);

        const newest = await Recipe.find({}).sort({_id: -1}).limit(limitCategories)
        const Breakfast = await Recipe.find({'category': 'Breakfast'}).limit(limitCategories)
        const Lunch = await Recipe.find({'category': 'Lunch'}).limit(limitCategories)
        const Dinner = await Recipe.find({'category': 'Dinner'}).limit(limitCategories)
        const Dessert = await Recipe.find({'category': 'Dessert'}).limit(limitCategories)
        const Everything = await Recipe.find({'category': 'Everything in Between'}).limit(limitCategories)

        const meals = { newest, Breakfast, Lunch, Dinner, Dessert, Everything };
        res.render('index', {title: 'Home', category, meals});    
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


exports.allRecipes = async (req, res) => {
    try {
        const allRecipes = await Recipe.find({});
        res.render('allRecipes', {title: 'Culi Recipes', allRecipes}); 
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


/* 
/ GET: Categories by ID
*/ 
exports.getCategoriesById = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const limit = 25;
        const catById = await Recipe.find({'category': categoryId}).limit(limit);
        res.render('Category', {title: 'Culi Categories', catById});    
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


/* 
/ GET: All Categories
*/ 
exports.getCategories= async(req, res) => {
    try {
        const limit = 25;
        const category = await categories.find({}).limit(limit);
        res.render('Category', {title: 'Culi Categories', category});    
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


/* 
/ GET: Recipe
*/ 
exports.getRecipe = async(req, res) => {
    try {
        // Grab recipe id
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId)
        // Render page of specific recipe by id
        res.render('recipe', {title: 'Culi Recipe', recipe})
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}

/* 
/ DELETE: Delete a Recipe
*/
exports.deleteRecipe = async (req, res) => {
    try {
        let recipeId = req.params.Id;
        await Recipe.deleteOne(recipeId);
        res.render('allRecipes');
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


/* 
/ GET: Create Recipe
*/ 
exports.getCreate_recipe = async(req, res) => {
    try {
        const infoErrObj = req.flash('infoErrors');
        const infoSubObj = req.flash('infoSubmit');
        res.render('create', {title: 'Create Culi Recipe', infoErrObj, infoSubObj}); 
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


/* 
/ POST: New Recipe
*/ 
exports.postCreate_recipe = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;
    
        if(!req.files || Object.keys(req.files).length === 0){
          console.log('No Files where uploaded.');
        } else {
    
          imageUploadFile = req.files.image;
          newImageName = Date.now() + imageUploadFile.name;
    
          uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
    
          imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.satus(500).send(err);
          })
        }
    
        const newRecipe = new Recipe({
          title: req.body.title,
          description: req.body.description,
          ingredients: req.body.ingredients,
          category: req.body.category,
          image: newImageName
        });
        
        await newRecipe.save();
    
        req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/create');
      } catch (error) {
        req.flash('infoErrors', error);
        res.redirect('/create');
      }
}


/* 
/ GET: About Page
*/ 
exports.getAbout_Culi = async(req, res) => {
    try {
        res.render('about', {title: 'About Culi'}); 
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


/* 
/ GET: Contact Page
*/ 
exports.getContact_Culi = async(req, res) => {
    try {
        const contactErrObj = req.flash('contactErrors');
        const contactSubObj = req.flash('contactSubmit');
        res.render('contact', {title: 'Contact Culi', contactErrObj, contactSubObj}); 
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


/* 
/ POST: Contact Page
*/ 
exports.postContact_Culi = async(req, res) => {
    try {
        const addContact = new Contact({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            message : req.body.message,
            email : req.body.email
        });

        await addContact.save();
    
        req.flash('contactSubmit', 'Your message has been sent!');
        res.redirect('/contact'); 
    } catch (error) {
        req.flash('contactErrors', error);
        res.redirect('/contact');
    }   
}



/* 
/ GET: Random Recipe
*/ 
exports.getRandom = async(req, res) => {
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render('random' , { title: 'Feeling Lucky', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
}


/* 
/ POST: Search for Recipe
*/
exports.search_for_recipe = async(req, res) => {
    try {
        let Search = req.body.Search;
        let recipe = await Recipe.find({ $text: {$search: Search, $diacriticSensitive: true}});
        res.render('search', {title: 'Search Results', recipe})
    } catch (error) {
        res.status(500).send({message: error.message || "Error"});
    }
    res.render('search',{title: "Search Culi"} )
}
























/**  
// SAMPLE INJECTION
/** 

async function insertDummyContact(){
    try {
        await Contact.insertMany([
            {
                "firstname": "Jordan",
                "lastname": "Levelle",
                "message": "Test",
                "email": "Test"
            }
        ])
    } catch (error) {
        console.log('err', + error)
    }
};

insertDummyContact();

async function insertDummyRecipeData(){
    try {
        await Recipes.insertMany([
            {
                "title": "Sausage Egg Casserole",
                "description": "Sausage Egg Casserole",
                "ingredients":[
                    "1 pound bulk pork sausage",
                    "6 large eggs",
                    "2 cups 2% milk",
                    "1 teaspoon salt",
                    "1 teaspoon ground mustard",
                    "6 slices white bread, cut into 1/2-inch cubes",
                    "1 cup shredded cheddar cheese",
                ],
                "category": "Breakfast",
                "image": "easyeggtacos.jpg"
            },
            {
                "title": "Bacon Breakfast Pizza",
                "description": "Bacon Breakfast Pizza",
                "ingredients":[
                    "1 tube (13.8 ounces) refrigerated pizza crust",
                    "2 tablespoons olive oil, divided",
                    "6 large eggs",
                    "2 tablespoons water",
                    "1 package (3 ounces) bacon bits",
                    "1 cup shredded Monterey Jack cheese",
                    "1 cup shredded cheddar cheese",
                ],
                "category": "Breakfast",
                "image": "chickpeas.jpg"
            },
            {
                "title": "Mixed Berry French Toast Bake",
                "description": "Mixed Berry French Toast Bake",
                "ingredients":[
                    "6 large Eggland's Best eggs",
                    "1-3/4 cups fat-free milk",
                    "1 teaspoon sugar",
                    "1 teaspoon ground cinnamon",
                    "1 teaspoon vanilla extract",
                    "1/4 teaspoon salt",
                    "1 loaf (1 pound) French bread, cubed",
                    "1 package (12 ounces) frozen unsweetened mixed berries",
                    "2 tablespoons cold butter",
                    "1/3 cup packed brown sugar",
                    "Optional: Confectioners' sugar and maple syrup",
                ],
                "category": "Lunch",
                "image": "coconutyogurtcake.jpg"
            },
            {
                "title": "Sour Cream Donuts",
                "description": "Sour Cream Donuts",
                "ingredients":[
                    "2 ?? cups bleached cake flour (such as Swans Down??), plus more for work surface, hands and cutter",
                    "2 teaspoons baking powder",
                    "?? teaspoon kosher salt",
                    "?? teaspoon ground nutmeg",
                    "?? teaspoon ground cinnamon",
                    "??? cup sour cream, room temperature",
                    "?? cup granulated sugar",
                    "2 large egg yolks, room temperature",
                    "1 tablespoon unsalted butter, melted and cooled slightly",
                    "1 tablespoon vegetable oil",
                    "1 teaspoon vanilla extract",
                    "vegetable oil as needed for frying",
                    "4 ?? cups powdered sugar",
                    "?? cup unsalted butter, melted",
                    "6 tablespoons hot water",
                    "1 ?? teaspoons light corn syrup",
                    "?? teaspoon kosher salt",
                    "?? teaspoon vanilla extract",
                ],
                "category": "Dessert",
                "image": "bananabakedoatmeal.jpg"
            },


        ])
    } catch (error) {
        console.log('err', + error)
    }
};

insertDummyRecipeData();

*/














