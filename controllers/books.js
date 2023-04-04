const express = require('express');
const router = express.Router();
// Array destructuring. That means if I go to models/index.js, which is the file I'm requiring, I expect that it's exporting an object. I only want the value of books from that object. It creates a variable books that's set to the value of the books key in the export for this file.
const { Books } = require('../models');
// const models = require('../models');
// const Books = models.Books;
const seededData = [
        {
            title: "The outsiders",
            author: "S.E. Hinton",
            price: 5.99
        }, {
            title: "Odd Thomas",
            author: "Dean Koontz",
            price: 8.99
        }, {
            title: "The Four Agreements",
            author: "Don Miguel Ruiz",
            price: 4.99
        }, {
            title: "Wild",
            author: "Cheryl Strayed",
            price: 19.99
        }
    ]

router.get('', async (req, res, next) => {
    try {
        let myBooks;
        console.log(req.query);
        if(req.query.search) {
            myBooks = await Books.find({author: req.query.search})
            console.log(myBooks);
        } else {
            myBooks = await Books.find({});
            console.log(myBooks);
        }
        // Run this Javascript code
        // console.log(myBooks);
        res.render('books/index', {books: myBooks})
    } catch(err) {
        // If there's an error, it'll go to the catch block
        console.log(err);
        next();
    }
})

router.get('/new', (req, res) => {
    res.render('books/new.ejs')
})

router.get('/:id', async (req, res, next) => {
    try {
        // Grab the book that has the corresponding ID in MongoDB
        const myBook = await Books.findById(req.params.id);
        console.log(myBook);
        res.render('books/show', {myBook})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.post('', async (req, res, next) => {
    try {
        const newBook = await Books.create(req.body);
        console.log(newBook);
        res.redirect('/books')
    } catch(err) {
        console.log(err);
        next();
    }
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const bookToBeEdited = await Books.findById(req.params.id);
        console.log(bookToBeEdited);
        res.render('books/edit.ejs', {book: bookToBeEdited})
    } catch(err) {
        console.log(err);
        next()
    }
})

router.get('/seed', async (req, res, next) => {
    try {
        await Books.deleteMany({})
        await Books.insertMany(seededData);
        res.redirect('/books');
    } catch(err) {
        console.log(err);
        next();
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        // const formData = req.body;
        // console.log(typeof formData.price);
        // formData.price = 'abcd';
        const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body);
        // console.log(updatedBook);
        res.redirect(`/books/${req.params.id}`)
    } catch(err) {
        console.log(err);
        next();
    }
})

router.get('/:id/delete', async (req, res, next) => {
    try {
        const bookToBeDeleted = await Books.findById(req.params.id);
        // console.log(bookToBeDeleted);
        res.render('books/delete.ejs', {book: bookToBeDeleted})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Books.findByIdAndDelete(req.params.id);
        // console.log(deletedItem);
        res.redirect('/books');
    } catch(err) {
        console.log(err);
        next();
    }
})


module.exports = router;