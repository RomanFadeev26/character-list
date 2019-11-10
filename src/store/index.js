import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import app from './app/reducer';
import entities from './entities';

const reducer = combineReducers({app, entities});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;