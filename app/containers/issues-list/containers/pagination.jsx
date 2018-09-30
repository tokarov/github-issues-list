// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {paginationButtonsNames, TOTAL_COUNT} from 'data/constants';

import {issuesListActions} from '../services/reducer';
import type {PaginationType} from '../types';

type PropsTypes = {
    setOffSet: (offSet: string) => void,
    pagination: PaginationType
}

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const PaginationContent = styled(Flex)`
  flex-direction: column;
  margin-top: 14px;
  width: 320px;
  height: 65px;
`;
const PaginationButtons = styled(Flex)`
  margin-bottom: 14px;
`;
const PaginationButton = styled(Flex)`
  justify-content: center;
  width: 70px;
  border: 1px solid ${({theme}) => theme.colors.forLine};
  padding: 5px;
  ${({disabled, theme}) => (disabled ? `background-color: ${theme.colors.disabled};` : '')};
`;

export class Pagination extends Component<PropsTypes, void> {
    handlePreviousClick = () => {
        const {setOffSet, pagination: {hasPreviousPage, startCursor}} = this.props;
        if (hasPreviousPage) {
            setOffSet(`before: "${startCursor}"`);
        }
    };

    handleNextClick = () => {
        const {setOffSet, pagination: {hasNextPage, startCursor}} = this.props;
        if (hasNextPage) {
            setOffSet(`after: "${startCursor}"`);
        }
    };

    render() {
        const {pagination: {hasNextPage, hasPreviousPage, totalCount}} = this.props;
        return (
            <PaginationContent>
                <PaginationButtons>
                    <PaginationButton
                        disabled={!hasPreviousPage}
                        onClick={this.handlePreviousClick}
                    >
                        {paginationButtonsNames.PREVIOUS}
                    </PaginationButton>
                    <PaginationButton
                        disabled={!hasNextPage}
                        onClick={this.handleNextClick}
                    >
                        {paginationButtonsNames.NEXT}
                    </PaginationButton>
                </PaginationButtons>
                {`${TOTAL_COUNT} ${totalCount}`}
            </PaginationContent>
        );
    }
}

export default connect(state => ({
    pagination: state.issuesList.pagination
}), issuesListActions)(Pagination);
