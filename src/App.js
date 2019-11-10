import React from 'react';
import {Provider} from 'react-redux';
import {Router, Switch} from 'react-router-dom';
import qhistory from 'qhistory';
import {createBrowserHistory} from 'history';
import {stringify, parse} from 'qs';
import Routes from './components/Routes';
import store from './store';

const history = qhistory(
    createBrowserHistory(),
    stringify,
    parse
);

export default () => (
    <Router history={history}>
        <Provider store={store}>
            <Switch>
                <Routes />
            </Switch>
        </Provider>
    </Router>
);
