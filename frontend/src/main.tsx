import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/globals.scss';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import PageNotFound from './pages/PageNotFound';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header />
            <main>
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
            </main>
            <Footer />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
