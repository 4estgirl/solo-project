import React, { useEffect, useState } from 'react';

import Book from './book';
import CreateBook from './create-book';

const List = (props) => {
    const [bookList, setBookList] = useState([]);

    const fetchGet = () => {
        fetch(props.get)
            .then(res => {
                return res.json();
            })
            .then(({ books }) => {
                setBookList(books);
            })
            .catch(err => console.log('list useEffect error', err));
    }

    useEffect(() => {
        fetchGet();
    }, []);

    const booksArr = [];
    for (let i = 0; i < bookList.length; i++) {
        booksArr.push(<Book key={`Book ${i}`}author={bookList[i].author} title={bookList[i].title} description={bookList[i].description} genre={bookList[i].genre} id={bookList[i].book_id} fetchGet={fetchGet}/>)
    }

    return(
        <div className="list">
            <h1>{props.type}</h1>
            <button id="custom-button" onClick={() => {
                const createBookModule = document.getElementById('create-book');
                return createBookModule.style.display === 'none' ? createBookModule.style.display = 'block' : createBookModule.style.display = 'none';
            }}>Create Custom Book</button>
            <div className="toggle" id="create-book">
                <CreateBook fetchGet={fetchGet}/>
            </div>
            {booksArr}
        </div>
    )
}
export default List;