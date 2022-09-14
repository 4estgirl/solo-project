const { response } = require('express');
const database = require('./model');

const controller = {};

controller.getBooks = (req, res, next) => {
    const text = 'SELECT * FROM books';
    database
        .query(text)
        .then(response => {
            res.locals.books = response.rows;
            return next();
        })
        .catch(err => {
            console.error('getBooks error');
            return next({
                log: 'getBooks error',
                message: { err: 'getBooks error'},
            });
        });
};

controller.saveBook = (req, res, next) => {
    console.log('made it to saveBook'); // making it here
    
    // const { title, author, genre, description } = req.body;
    // console.log('title', title);

    const text = 'INSERT INTO books(title, author, genre, description) VALUES($1, $2, $3, $4)';

    console.log('text', text);
    console.log(req.body);
    // if req.body.description is longer than 100 char, reduce to under 100 char
    const values = [req.body.title, req.body.author, req.body.genre, req.body.description];

    console.log('values', values);

    database
        .query(text, values)
        .then(response => {
            console.log('post response: done')
            return next();
        })
        .catch(err => {
            console.error('saveBook error');
            return next({
                log: 'saveBook error',
                message: { err: 'saveBook error'},
            });
        });
}

controller.updateBook = (req, res, next) => {
    // use req.params to grab correct book id
    text = 'UPDATE books SET _____ WHERE book_id=___'
}

controller.deleteBook = (req, res, next) => {
    // use req.params to grab correct book id
    text = `DELETE FROM books WHERE book_id = ${req.params.id.slice(3)}`;
    database
        .query(text)
        .then(response => {
            console.log('delete response: done')
            return next();
        })
        .catch(err => {
            console.error('deleteBook error');
            return next({
                log: 'deleteBook error',
                message: { err: 'deleteBook error'},
            });
        });
}

module.exports = controller;