import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import * as reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';


const router = routerMiddleware(history);
/* eslint-disable no-underscore-dangle */
const reduxLogger = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({maxAge: 10})
    : f => f;
/* eslint-enable */

export const appStore = createStore(
    combineReducers({
        ...reducers
    }),
    compose(applyMiddleware(router, thunkMiddleware), reduxLogger)
);
