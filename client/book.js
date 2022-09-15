import React from 'react';
import UpdateBook from './update-book';

const Book = (props) => {
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
                return props.fetchGet();
            })
            .catch(err => console.log('delete-book delete fetch error', err))
    };

    const changeType = (id, title, author, genre, description) => {
        const bookData = {
            title: `${title}`,
            author: `${author}`,
            genre: `${genre}`,
            description: `${description}`
        }
        console.log('bookData', JSON.stringify(bookData));
    
        const url = `/books/id=${id}`
        console.log(url)
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(bookData)
        })
            .then(resp => {
                console.log('1 response', resp); 
                console.log('1 res body', resp.body); 
                return resp.json()
            })
            .then((data) => {
                console.log('1 post data', data)
                return props.fetchGet();
            })
            .catch(err => console.log('1 change type patch fetch error', err))
    };

    if (props.type === 'My List') {
        return (
            <div className="book">
                <ul>
                    <li><strong>Title:</strong> {props.title}</li>
                    <li><strong>Author:</strong> {props.author}</li>
                    <li><strong>Genre:</strong> {props.genre}</li>
                    <li><strong>Description:</strong> {props.description}</li>
                </ul>
                <button id="delete-book" onMouseUp={async () => {
                    await deleteBook(props.id);
                    props.fetchGet();
                    }}>Delete</button>
                <button onClick={() => {
                    const updateBookModule = document.getElementById(`update-book-form-${props.id}`);
                    return updateBookModule.style.display === 'none' ? updateBookModule.style.display = 'block' : updateBookModule.style.display = 'none';
                }}>Edit</button>
                <div className="toggle" id={`update-book-form-${props.id}`}>
                    <UpdateBook key={`UpdateB ${props.id}`} author={props.author} title={props.title} description={props.description} genre={props.genre} id={props.id} fetchGet={props.fetchGet}/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="book">
                <ul>
                    <li><strong>Title:</strong> {props.title}</li>
                    <li><strong>Author:</strong> {props.author}</li>
                    <li><strong>Genre:</strong> {props.genre}</li>
                    <li><strong>Description:</strong> {props.description}</li>
                </ul>
                <button onClick={async () => {
                    await changeType(props.id, props.title, props.author, props.genre, props.description);
                    props.fetchGet();
                    }}>Add To List</button>
            </div>
        );
    }
}

export default Book;