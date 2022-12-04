require('dotenv').config()
console.log(process.env)

/*/
/ Require Express
/*/
const express = require('express');
const expressLayouts = require('express-ejs-layouts');


/*/
/ Require fileUpload, Session, CookieParser, Flash
/*/
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');

var methodOverride = require('method-override')

const app = express();
const port = process.env.PORT || 3000;


/*/ 
/ MiddleWare
/*/
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(methodOverride('_method'))


app.use(express.json());

app.use(cookieParser('recipe_project_secure'));
app.use(session({
    secret: 'recipe_project_secure',
    saveUninitialized: true,
    resave: true,
    httpOnly: true
}));

app.use(flash());
app.use(fileUpload());


/*/ 
/ Set layouts and Routes
/*/
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

const routes = require('./server/routes/Routes');
const { allRecipes } = require('./server/controller/Controller');
app.use('/', routes);


// Set port 
app.listen(port, ()=> console.log(`Running on port ${port}`));