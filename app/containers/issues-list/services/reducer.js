// @flow

import {pathOr, reverse} from 'ramda';
import {createAction, handleActions} from 'redux-actions';
import * as Api from './api';

const defaultState = {
    pagination: {
        size: 20,
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0
    },
    filter: '',
    issues: []
};
const setIssues = createAction('SET_ISSUES');
const setPagination = createAction('SET_PAGINATION');

const loadReactIssues = () => (dispatch: Function, getState: Function) => {
    const {issuesList: {pagination: {size}}} = getState();
    const issuesPath = ['data', 'repository', 'issues'];
    Api.loadReactIssues(size, 'states: [OPEN, CLOSED]')
        .then(({data}) => {
            dispatch(setIssues(reverse(pathOr([], [...issuesPath, 'nodes'], data))));
            dispatch(setPagination({
                ...pathOr(false, [...issuesPath, 'pageInfo'], data),
                size,
                totalCount: pathOr(0, [...issuesPath, 'totalCount'], data)
            }));
        });
};

export const issuesListActions = {
    setFilter: createAction('SET_FILTER'),
    setPagination,
    loadReactIssues
};

export const reducer = handleActions({
    SET_PAGINATION: (state, action) => ({
        ...state,
        pagination: action.payload
    }),
    SET_FILTER: (state, action) => ({
        ...state,
        filter: action.payload
    }),
    SET_ISSUES: (state, action) => ({
        ...state,
        issues: action.payload
    })
}, defaultState);
