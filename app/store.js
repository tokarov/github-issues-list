import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import reducers from './reducers';


const router = routerMiddleware();
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
