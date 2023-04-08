require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000;
const methodOverride = require('method-override')
const booksController = require('./controllers/books')
const householdProductsController = require('./controllers/householdProducts')
const musicController = require('./controllers/music')
const sportsEquipmentController = require('./controllers/sportsEquipment')
const userController = require('./controllers/users');
// session and MongoStore are combining to create actual sessions in our database that are unique to the environment they're given. You have to npm install these
const session = require('express-session');
const MongoStore = require('connect-mongo');

// This is array destructuring in Javascript. It's actually creating four variables (books, householdProducts etc) and it's setting them equal to the value of the key in the exported object from the file they're pointing at.
// const { books, householdProducts, music, sportsEquipment } = require('./models');
// console.log(sportsEquipment);
const { Specials } = require('./models')
// I want to specify that all my views for res.render are going to be in a directory I call views. 
app.set('view engine', 'ejs');
// I now also want to make sure I connect this to the CSS files and any DOM manipulation. It expects this to be in a directory named "public"
app.use(express.static('public'));
// This is going to create the actual sessions as part of the middleware prior to us hitting our routes. That ensures it's available to all the routes. 
app.use(
    session({
        // The store needs to know that it's a mongo database and it needs access to the databases' connection
        store: MongoStore.create({ 
            mongoUrl: process.env.MONGO_DB_URI
        }),
        // The secret ensures it's not some outside attack and it signs every session
        secret: process.env.SECRET,
        // No resaving the same same session and saving unitialized sessions
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
            // This set the cookie to last for 7 days because it's in milliseconds
        }
    }),
)
// This is to help ensure things come in as the req.body when you submit a form. This works for post and put routes
app.use(express.urlencoded({ extended:false }));

// This is allowing forms to both put and delete if they want
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home', {specials: Specials})
})

app.use('', userController);
app.use('/books', booksController);
app.use('', householdProductsController);
app.use('', musicController);
app.use('', sportsEquipmentController);

app.get('/*', (req, res) => {
    res.render('404.ejs');
})

app.listen(PORT, () => {
    console.log(`$ 💲 ＄ Server is listening to PORT ${PORT} 🤑 💵 💰`)
})