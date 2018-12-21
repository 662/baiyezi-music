import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Layout from './layout';
import Search from './search';

import history from '../../src/history';
import RootStore from '../stores/RootStore';

const store = new RootStore();

export default function index() {
    return (
        <Provider {...store}>
            <Router history={history}>
                <Layout>
                    <Route path="/search" component={Search} />
                </Layout>
            </Router>
        </Provider>
    );
}
