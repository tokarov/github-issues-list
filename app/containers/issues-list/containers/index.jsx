// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {IS_LOADING} from 'data/constants';

import {issuesListActions} from '../services/reducer';
import Issue from '../components/Issue';
import TableHeader from './table-header';
import Pagination from './pagination';
import type {IssueType} from '../types';

type PropsTypes = {
    loadReactIssues: () => void,
    issues: Array<IssueType>,
    isLoading: boolean
}

const Content = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Table = styled.div`
  border: 1px solid ${({theme}) => theme.colors.forLine};
  width: 800px;
   @media (max-width: 800px) {
      width: 100%
   }
`;

class IssuesList extends Component<PropsTypes, void> {
    componentDidMount() {
        const {loadReactIssues} = this.props;
        loadReactIssues();
    }

    render() {
        const {issues, isLoading} = this.props;
        return (
            <Content>
                <Table>
                    <TableHeader />
                    {isLoading && IS_LOADING}
                    {issues.map((issue: IssueType) => <Issue issue={issue} />)}
                </Table>
                <Pagination />
            </Content>
        );
    }
}

export default connect(state => ({
    ...state.issuesList
}), issuesListActions)(IssuesList);
