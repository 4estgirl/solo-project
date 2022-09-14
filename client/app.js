import React, { useEffect } from 'react';
import { Link, Router, Switch, Route } from 'react-router-dom';

import List from './list';

const App = props => {

    useEffect(() => {
        fetch('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=zZOlDCNWmqnPn4v3SEvRGaPapVwMACfn')
            .then(resp => resp.json())
            .then(data => {
                const bestBooks = [];
                for (let i = 0; i < data.results.length; i++){
                    bestBooks.push({
                        title: data.results[i].title,
                        author: data.results[i].author,
                        description: data.results[i].description,
                        genre: data.results[i].ranks_history[0] ? data.results[i].ranks_history[0].list_name : '',
                        type: 'NYT Bestsellers'
                    })
                }
            })
            .catch(err => console.log('App useEffect error', err));
    }, []);

    return (
        <div id="list-container">
            <List type="My List" get="/books"/>
        </div>
    );
}

export default App;