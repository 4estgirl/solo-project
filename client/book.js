import React from 'react';

const Book = (props) => {
    return (
        <div>
            <li>Title: {props.title}</li>
            <li>Author: {props.author}</li>
            <li>Genre: {props.genre}</li>
            <li>Description: {props.description}</li>
        </div>
    );
}

export default Book;