// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {issuesListActions} from '../services/reducer';
import type {IssuesType, PaginationType} from '../types';
import Issue from '../components/Issue';

type PropsTypes = {
    loadReactIssues: () => void,
    pagination: PaginationType,
    issues: IssuesType
}

class IssuesList extends Component<PropsTypes, void> {
    componentDidMount() {
        const {loadReactIssues} = this.props;
        loadReactIssues();
    }

    render() {
        const {issues, pagination} = this.props;
        return (
            <div>
                {issues.map(issue => <Issue issue={issue} />)}
                {pagination.size}
            </div>
        );
    }
}

export default connect(state => ({
    ...state.issuesList
}), issuesListActions)(IssuesList);
