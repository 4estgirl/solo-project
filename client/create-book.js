import React from 'react';
import { useState } from 'react';

const useInput = () => {
    const [value, setValue] = useState('');
    const onChange = e => {
        setValue(e.target.value);
    };
    return [value, onChange];
}

const CreateBook = (props) => {
    const [title, titleOnChange] = useInput();
    const [author, authorOnChange] = useInput();
    const [genre, genreOnChange] = useInput();
    const [description, descriptionOnChange] = useInput();

    const createBook = () => {
        const bookData = {
            title,
            author,
            genre,
            description,
        }
        if (title === '' || author === '') {
            // throw error - REQUIRED
        }
        console.log('bookData', JSON.stringify(bookData));
        fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(bookData)
        })
            .then(resp => {
                console.log('response', resp); // logs response w/ status 500
                console.log('res body', resp.body); // logs readableStream
                return resp.json()
            })
            .then((data) => {
                console.log('post data', data) // Why is this an error??
            })
            .catch(err => console.log('create-book post fetch error', err))
    };

    return (
        <div id="create-form">
            <label htmlFor="title">Title:</label>
            <input name="title" value={title} onChange={titleOnChange}></input>
            <label htmlFor="author">Author:</label>
            <input name="author" value={author} onChange={authorOnChange}></input>
            <label htmlFor="genre">Genre:</label>
            <input name="genre" value={genre} onChange={genreOnChange}></input>
            <label htmlFor="description">Description:</label>
            <input name="description" value={description} onChange={descriptionOnChange}></input>
            <button onClick={() => {
                createBook();
                props.fetchGet();
            }
            }>Add Book</button>
        </div>
    )
}

export default CreateBook;