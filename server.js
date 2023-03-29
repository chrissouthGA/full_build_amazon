const express = require('express');
const app = express();
const PORT = 4000;
const booksController = require('./controllers/books')
const householdProductsController = require('./controllers/householdProducts')
const musicController = require('./controllers/music')
const sportsEquipmentController = require('./controllers/sportsEquipment')
// This is array destructuring in Javascript. It's actually creating four variables (books, householdProducts etc) and it's setting them equal to the value of the key in the exported object from the file they're pointing at.
// const { books, householdProducts, music, sportsEquipment } = require('./models');
// console.log(sportsEquipment);
const { specials } = require('./models')
// I want to specify that all my views for res.render are going to be in a directory I call views. 
app.set('view engine', 'ejs');
// I now also want to make sure I connect this to the CSS files and any DOM manipulation. It expects this to be in a directory named "public"
app.use(express.static('public'));

app.use(express.urlencoded({ extended:false }));

app.get('/', (req, res) => {
    res.render('home.ejs', {specials})
})

app.use('/books', booksController);
app.use('', householdProductsController);
app.use('', musicController);
app.use('', sportsEquipmentController);

app.listen(PORT, () => {
    console.log(`$ 💲 ＄ Server is listening to PORT ${PORT} 🤑 💵 💰`)
})