// @flow

import {pathOr, reverse} from 'ramda';
import {createAction, handleActions} from 'redux-actions';
import * as Api from './api';
import type {FilterType} from '../types';

const defaultState = {
    pagination: {
        size: 15,
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0,
        endCursor: '',
        startCursor: '',
        offset: ''
    },
    isLoading: true,
    filter: {
        states: ['OPEN']
    },
    issues: []
};
const setIssues = createAction('SET_ISSUES');
const setPagination = createAction('SET_PAGINATION');
const setIsLoading = createAction('SET_IS_LOADING');
const setFilter = createAction('SET_FILTER');

const loadReactIssues = () => (dispatch: Function, getState: Function) => {
    const {issuesList: {pagination: {size, offset}, filter}} = getState();
    const issuesPath = ['data', 'repository', 'issues'];
    const issueFilter = JSON.stringify(filter)
        .replace(/["}{]/g, '');
    dispatch(setIsLoading(true));
    dispatch(setIssues([]));
    Api.loadReactIssues(size, issueFilter, offset)
        .then(({data}) => {
            dispatch(setIssues(reverse(pathOr([], [...issuesPath, 'nodes'], data))));
            dispatch(setPagination({
                ...pathOr(false, [...issuesPath, 'pageInfo'], data),
                size,
                offset,
                totalCount: pathOr(0, [...issuesPath, 'totalCount'], data)
            }));
            dispatch(setIsLoading(false));
        });
};
const getFilteredIssues = (filter: FilterType) => (dispatch: Function) => {
    dispatch(setFilter(filter));
    dispatch(loadReactIssues());
};

const setOffSet = (offset: string) => (dispatch: Function, getState: Function) => {
    const {issuesList: {pagination}} = getState();
    dispatch(setPagination({...pagination, offset}));
    dispatch(loadReactIssues());
};

export const issuesListActions = {
    getFilteredIssues,
    setOffSet,
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
    }),
    SET_IS_LOADING: (state, action) => ({
        ...state,
        isLoading: action.payload
    })
}, defaultState);
