import React from 'react';

const Book = (props) => {
    return (
        <div className="book">
            <ul>
                <li>Title: {props.title}</li>
                <li>Author: {props.author}</li>
                <li>Genre: {props.genre}</li>
                <li>Description: {props.description}</li>
            </ul>
            <button id="delete-book">Delete</button>
            <button id="update-book">Edit</button>
        </div>
    );
}

export default Book;