// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Images} from 'components/images';
import {filterStatuses, filterStatusesNames} from 'data/constants';

import {issuesListActions} from '../services/reducer';
import type {FilterType} from '../types';

type PropsTypes = {
    getFilteredIssues: (filter: FilterType) => void,
    filter: FilterType
}

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const TableHeaderContent = styled(Flex)`
  height: 40px;
  border-bottom: 1px solid ${({theme}) => theme.colors.forLine};
  background-color: ${({theme}) => theme.colors.background};
`;
const StatesButton = styled(Flex)` 
  margin-left: 15px;
  text-decoration: underline;
  ${({active}) => (active ? 'font-weight: bold;' : '')};
`;

class TableHeader extends Component<PropsTypes, void> {
    handleFilterStateClick = (selectedState: string, isActive: boolean) => () => {
        const {getFilteredIssues, filter, filter: {states}} = this.props;
        getFilteredIssues({
            ...filter,
            states: isActive ? states.filter((state: string) => state !== selectedState) : [...states, selectedState]
        });
    };

    render() {
        const {filter: {states}} = this.props;
        const isOpenActive = states.includes(filterStatuses.OPEN);
        const isClosedActive = states.includes(filterStatuses.CLOSED);
        return (
            <TableHeaderContent>
                <StatesButton
                    active={isOpenActive}
                    onClick={this.handleFilterStateClick(filterStatuses.OPEN, isOpenActive)}
                >
                    <Images.Opened />
                    {filterStatusesNames.OPEN}
                </StatesButton>
                <StatesButton
                    active={isClosedActive}
                    onClick={this.handleFilterStateClick(filterStatuses.CLOSED, isClosedActive)}
                >
                    <Images.Closed />
                    {filterStatusesNames.CLOSED}
                </StatesButton>
            </TableHeaderContent>
        );
    }
}

export default connect(state => ({
    filter: state.issuesList.filter
}), issuesListActions)(TableHeader);
