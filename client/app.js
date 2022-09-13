import React, { Component } from 'react';
import { Link, Router, Switch, Route } from 'react-router-dom';

import List from './list';

const App = props => {
    return (
        <div id="list-container">
            <List/>
        </div>
    );
}

export default App;