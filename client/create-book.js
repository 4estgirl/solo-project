import React from 'react';
import { useState } from 'react';

const createBook = () => {
    const defaultVals = {
        title: 'Title',
        author: 'Author',
        description: null
    }
};

const CreateBook = (props) => {
    return (
        <div>
            <label htmlFor="title">Title:</label>
            <input name="title"></input>
            <label htmlFor="author">Author:</label>
            <input name="author"></input>
            <button onClick={() => createBook()}>Add Book</button>
        </div>
    )
}

export default CreateBook;