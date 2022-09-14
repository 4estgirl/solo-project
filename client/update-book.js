import React from 'react';
import { useState } from 'react';

const useInput = () => {
    const [value, setValue] = useState('');
    const onChange = e => {
        setValue(e.target.value);
    };
    return [value, onChange];
}

const UpdateBook = (props) => {
    const [title, titleOnChange] = useInput();
    const [author, authorOnChange] = useInput();
    const [genre, genreOnChange] = useInput();
    const [description, descriptionOnChange] = useInput();

    const updateBook = (id) => {
        const bookData = {
            title: (title !== '' ? title : props.title),
            author: (author !== '' ? author : props.author),
            genre: (genre !== '' ? genre : props.genre),
            description: (description !== '' ? description : props.description)
        }
        console.log('bookData', JSON.stringify(bookData));

        const url = `/books/id=${id}`

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(bookData)
        })
            .then(resp => {
                console.log('response', resp); 
                console.log('res body', resp.body); 
                return resp.json()
            })
            .then((data) => {
                console.log('post data', data) 
            })
            .catch(err => console.log('create-book post fetch error', err))
    };

    return (
        <div>
            <label htmlFor="title">New Title:</label>
            <input name="title" value={title} onChange={titleOnChange}></input>
            <label htmlFor="author">New Author:</label>
            <input name="author" value={author} onChange={authorOnChange}></input>
            <label htmlFor="genre">New Genre:</label>
            <input name="genre" value={genre} onChange={genreOnChange}></input>
            <label htmlFor="description">New Description:</label>
            <input name="description" value={description} onChange={descriptionOnChange}></input>
            <button onClick={() => updateBook(props.id)}>Update Book</button>
        </div>
    )
}

export default UpdateBook;