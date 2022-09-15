const express = require('express');
const app = express();
const path = require('path');

const controller = require('./controllers.js');

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, './client/index.html'))
});

app.get('/books', controller.getMyBooks, (req, res) => {
    return res.status(200).json({books: res.locals.books});
})

// set up get route for outside api
app.get('/best-sellers', controller.getBestSellers, (req, res) => {
    return res.status(200).json({bestSellers: res.locals.bestSellers})
})

app.post('/books', /*making it into saveBook
},*/ controller.saveBook, (req, res) => {
    console.log('made it'); // not making it here
    res.status(200).json({});
})

app.delete('/books/:id', controller.deleteBook, (req, res) => {
    res.status(200).json({});
})

app.patch('/books/:id', controller.updateBook, (req, res) => {
    res.status(200).json({});
})

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred'},
    };
    const errorObj =  Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(port);