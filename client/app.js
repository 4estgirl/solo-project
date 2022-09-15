import React, { useEffect } from 'react';
import { Link, Router, Switch, Route } from 'react-router-dom';

import List from './list';

const App = props => {

    useEffect(() => {
        // get current bestseller list
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
                // get NYT books in database
                fetch('/best-sellers')
                    .then(res => {
                        console.log('BS response', res)
                        return res.json();
                    })
                    .then(({ bestSellers }) => {
                        console.log('BS', bestSellers)
                        if (bestSellers.length === 0) {
                            console.log('made it into if')
                            for (let i = 0; i < bestBooks.length; i++) {
                                fetch('/books', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'Application/JSON'
                                    },
                                    body: JSON.stringify(bestBooks[i])
                                })
                                .then(resp => {
                                    console.log('if, 1st then, curent book', bestBooks[i])
                                    return resp.json()
                                })
                                .then((data) => {
                                    console.log('post data', data)
                                })
                                .catch(err => console.log('create-book post fetch error', err))
                            }
                        } else {
                            console.log('made it into else')
                            const titles = [];
                            for (let i = 0; i < bestSellers.length; i++) {
                                titles.push(bestSellers[i].title);
                            }
                            for (let i = 0; i < bestBooks.length; i++) {
                                // console.log('titles', titles);
                                // console.log('current title', bestBooks[i].title);
                                // console.log('titles includes current title', titles.includes(bestBooks[i].title))

                                console.log('CHECKING TITLE')
                                if (!titles.includes(bestBooks[i].title)) {
                                    console.log('POSTING');
                                    //POST
                                    // if current book not in history, push to database
                                    fetch('/books', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'Application/JSON'
                                        },
                                        body: JSON.stringify(bestBooks[i])
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
                                }
                            }
                        }
                            // history.push(bestSellers[i])
                    })
                    .catch(err => console.log('app getBestSellers err', err));
            })
            .catch(err => console.log('App useEffect error', err));
        console.log('end of useEffect')
    }, []);

    return (
        <div id="list-container">
            <List type="My List" get="/books"/>
            <List type="NYT Bestsellers" get="/best-sellers"/>
        </div>
    );
}

export default App;