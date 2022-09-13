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
            console.error('getCharacters error');
            return next({
                log: 'getCharacters error',
                message: { err: 'getCharacters error'},
            });
        });;
}

module.exports = controller;