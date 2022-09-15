import React, { useEffect, useState } from 'react';

import Book from './book';
import CreateBook from './create-book';

const List = (props) => {
    const [bookList, setBookList] = useState([]);
    
    // let localsName;
    // if (props.get === '/books') localsName = books;
    // if (props.get === '/best-sellers') localsName = bestSellers;

    const fetchGet = () => {
        fetch(props.get)
            .then(res => {
                return res.json();
            })
            .then(({ books, bestSellers }) => {
                if (props.get === '/books') {
                    setBookList(books);
                } else {
                    setBookList(bestSellers);
                }
            })
            .catch(err => console.log('list useEffect error', err));
    }

    useEffect(() => {
        fetchGet();
    }, []);

    const booksArr = [];
    for (let i = 0; i < bookList.length; i++) {
        booksArr.push(<Book key={`Book ${i}`} author={bookList[i].author} title={bookList[i].title} description={bookList[i].description} genre={bookList[i].genre} id={bookList[i].book_id} type={bookList[i].type} fetchGet={fetchGet}/>)
    }

    if (props.get === '/books') {
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
    } else {
        return(
            <div className="list">
                <h1>{props.type}</h1>
                {booksArr}
            </div>
        )
    }
}
export default List;