// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {issuesListActions} from '../services/reducer';

type PropsTypes = {
    setPageSize: (size: number) => void,
    setPageNumber: (page: number) => void,
    setFilter: (filter: string) => void
}

class IssuesList extends Component<PropsTypes, void> {
    render() {
        return (
           <div>IssuesList</div>
        )
    }
}

export default connect(null, issuesListActions)(IssuesList);
