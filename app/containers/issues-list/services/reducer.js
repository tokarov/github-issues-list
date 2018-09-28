// @flow

import {createAction, handleActions} from 'redux-actions';

const defaultState = {
    pagination: {
        page: 0,
        size: 20
    },
    filter: ''
};
export const issuesListActions = {
    setPageSize: createAction('SET_PAGE_SIZE'),
    setPageNumber: createAction('SET_PAGE'),
    setFilter: createAction('SET_FILTER')
};

export const reducer = handleActions({
    SET_PAGE_SIZE: (state, action) => ({
        ...state,
        pagination: {
            ...state.pagination,
            size: action.payload
        }
    }),
    SET_PAGE: (state, action) => ({
        ...state,
        pagination: {
            ...state.pagination,
            page: action.payload
        }
    }),
    SET_FILTER: (state, action) => ({
        ...state,
        filter: action.payload
    })
}, defaultState);
