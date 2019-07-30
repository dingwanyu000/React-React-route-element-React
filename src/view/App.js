import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Student';
import Demo1 from './Demo1';
import Demo2 from './Demo2';
import Demo3 from './Demo3';
import { post, get } from './../api/Api'

window.$post = post
window.$get = get
export default class App extends React.Component {
    render() {
        return (
            <Router >
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/Demo1" component={Demo1} />
                    <Route path="/Demo2" component={Demo2} />
                    <Route path="/Demo3" component={Demo3} />
                </div>
            </Router>
        )
    }
}