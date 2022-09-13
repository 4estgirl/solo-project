import React, { useEffect } from 'react';

import Book from './book';
import CreateBook from './create-book';

const List = (props) => {
    useEffect(() => {
        fetch('/books')
            .then(res => {
                console.log('res', res.body)
                res.json();
            })
            .then(({ books }) => {
                console.log(books) // should be array containing objs
            })
            .catch(err => console.log('list useEffect error', err));
    });

    return(
        <div>
            <button onClick={() => {
                const createBookModule = document.getElementById('create-book');
                return createBookModule.style.display === 'none' ? createBookModule.style.display = 'block' : createBookModule.style.display = 'none';
            }}>Create Custom Book</button>
            <div id="create-book">
                <CreateBook/>
            </div>
            <Book />
            <Book />
        </div>
    )
}
export default List;