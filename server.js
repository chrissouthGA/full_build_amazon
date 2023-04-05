require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000;
const methodOverride = require('method-override')
const booksController = require('./controllers/books')
const householdProductsController = require('./controllers/householdProducts')
const musicController = require('./controllers/music')
const sportsEquipmentController = require('./controllers/sportsEquipment')
// This is array destructuring in Javascript. It's actually creating four variables (books, householdProducts etc) and it's setting them equal to the value of the key in the exported object from the file they're pointing at.
// const { books, householdProducts, music, sportsEquipment } = require('./models');
// console.log(sportsEquipment);
const { Specials } = require('./models')
// I want to specify that all my views for res.render are going to be in a directory I call views. 
app.set('view engine', 'ejs');
// I now also want to make sure I connect this to the CSS files and any DOM manipulation. It expects this to be in a directory named "public"
app.use(express.static('public'));

// This is to help ensure things come in as the req.body when you submit a form. This works for post and put routes
app.use(express.urlencoded({ extended:false }));

// This is allowing forms to both put and delete if they want
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home', {specials: Specials})
})

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