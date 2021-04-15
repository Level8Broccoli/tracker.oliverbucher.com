import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/globals.scss';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import PageNotFound from './pages/PageNotFound';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/:name">
                    <Tracker />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
