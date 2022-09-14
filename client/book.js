import React from 'react';
import UpdateBook from './update-book';

const deleteBook = (id) => {
    const url = `/books/id=${id}`;
    console.log(url);
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => {
            console.log('response', resp);
            return resp.json()
        })
        .then((data) => {
            console.log('delete data', data)
        })
        .catch(err => console.log('delete-book delete fetch error', err))
};

const Book = (props) => {
    return (
        <div className="book">
            <ul>
                <li>Title: {props.title}</li>
                <li>Author: {props.author}</li>
                <li>Genre: {props.genre}</li>
                <li>Description: {props.description}</li>
            </ul>
            <button id="delete-book" onClick={() => deleteBook(props.id)}>Delete</button>
            <button id="update-book">Edit</button>
            <div id="update-book-form">
                <UpdateBook key={`UpdateB ${props.id}`} author={props.author} title={props.title} description={props.description} genre={props.genre} id={props.id}/>
            </div>
        </div>
    );
}

export default Book;