import React, { useEffect, useState } from 'react';

import Book from './book';
import CreateBook from './create-book';

const List = (props) => {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        fetch('/books')
            .then(res => {
                return res.json();
            })
            .then(({ books }) => {
                setBookList(books);
            })
            .catch(err => console.log('list useEffect error', err));
    }, []);

    const booksArr = [];
    for (let i = 0; i < bookList.length; i++) {
        booksArr.push(<Book key={`Book ${i}`}author={bookList[i].author} title={bookList[i].title} description={bookList[i].description} genre={bookList[i].genre} id={bookList[i].book_id}/>)
    }

    return(
        <div className="list">
            <button onClick={() => {
                const createBookModule = document.getElementById('create-book');
                return createBookModule.style.display === 'none' ? createBookModule.style.display = 'block' : createBookModule.style.display = 'none';
            }}>Create Custom Book</button>
            <div id="create-book">
                <CreateBook/>
            </div>
            {booksArr}
        </div>
    )
}
export default List;