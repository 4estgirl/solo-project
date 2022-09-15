const { response } = require('express');
const database = require('./model');

const controller = {};

controller.getMyBooks = (req, res, next) => {
    const text = 'SELECT * FROM books WHERE type=\'My List\'';
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

    const text = 'INSERT INTO books(title, author, genre, description, type) VALUES($1, $2, $3, $4, $5)';

    console.log('text', text);
    console.log(req.body);
    // if req.body.description is longer than 100 char, reduce to under 100 char
    const values = [req.body.title, req.body.author, req.body.genre, req.body.description, (req.body.type || 'My List')];

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
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const description = req.body.description;

    text = `UPDATE books SET title = '${title}', author = '${author}', genre = '${genre}', description = '${description}' WHERE book_id = ${req.params.id.slice(3)}`

    console.log('text', text);

    database
        .query(text)
        .then(response => {
            console.log('update response: done')
            return next();
        })
        .catch(err => {
            console.error('updateBook error');
            return next({
                log: 'updateBook error',
                message: { err: 'updateBook error'},
            });
        });
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

controller.getBestSellers = (req, res, next) => {
    const text = 'SELECT * FROM books WHERE type=\'NYT Bestsellers\'';
    database
        .query(text)
        .then(response => {
            res.locals.bestSellers = response.rows;
            return next();
        })
        .catch(err => {
            console.error('getBestSellers error');
            return next({
                log: 'getBestSellers error',
                message: { err: 'getBestSellers error'},
            });
        });
};

module.exports = controller;