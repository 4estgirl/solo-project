import React from 'react';

import Book from './book';
import CreateBook from './create-book';

const List = (props) => {
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