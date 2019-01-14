import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Layout from './layout';
import Search from './search';
import Songlist from './songlist';
import Playlist from './playlist';

import history from '../../src/history';
import RootStore from '../stores/RootStore';

const store = new RootStore();

export default function index() {
    return (
        <Provider {...store}>
            <Router history={history}>
                <Layout>
                    <Switch>
                        <Route path="/search" component={Search} />
                        <Route path="/playlist" component={Playlist} />
                        <Route path="/songlist/:title" component={Songlist} />
                        <Redirect path="/" to="/search" />
                    </Switch>
                </Layout>
            </Router>
        </Provider>
    );
}
