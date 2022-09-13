const { response } = require('express');
const database = require('./model');

const controller = {};

controller.getBooks = (req, res, next) => {
    const text = 'SELECT * FROM books';
    // console.log('I made it to getBooks');
    database
        .query(text)
        .then(response => {
            res.locals.books = response.rows;
            // console.log(res.locals.books);
            return next();
        })
        .catch(err => {
            console.error('getCharacters error');
            return next({
                log: 'getCharacters error',
                message: { err: 'getCharacters error'},
            });
        });;
}

module.exports = controller;