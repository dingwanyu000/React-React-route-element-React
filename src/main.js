import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import Login from './view/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom';
ReactDOM.render(
    <Router>
        <div>
            <Route exact={true} path="/" component={Login} />
            <Route path="/home" component={App} />
        </div>
    </Router>,
    document.getElementById('app')
);
