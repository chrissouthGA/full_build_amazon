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
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended:false }));

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.use('/books', booksController);
app.use('', householdProductsController);
app.use('', musicController);
app.use('', sportsEquipmentController);

app.listen(PORT, () => {
    console.log(`$ 💲 ＄ Server is listening to PORT ${PORT} 🤑 💵 💰`)
})