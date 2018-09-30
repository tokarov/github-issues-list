// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Images} from 'components/images';
import {statuses} from 'data/constants';

import type {IssueType} from '../types';

type PropsTypes = {
    issue: IssueType
}

const Row = styled.div`
  padding: 5px;
  border-bottom: 1px solid ${({theme}) => theme.colors.forLine};
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.span`
  font-weight: bold;
`;
const DescriptionContainer = styled.div`
  margin: 5px 0 0 23px;
`;

const statusImages = {
    OPEN: <Images.Opened />,
    CLOSED: <Images.Closed />
};

export default class Issue extends Component<PropsTypes, void> {
    getDescription = (): string => {
        const {issue: {number, state, closedAt, createdAt, author: {login}}} = this.props;
        if (state === 'OPEN') {
            return `#${number} ${statuses[state]} ${moment(createdAt)
                .fromNow()} by ${login}`;
        }
        return `#${number} by ${login} ${statuses[state]} ${moment(closedAt)
            .fromNow()}`;
    };

    render() {
        const {issue: {title, state}} = this.props;
        return (
            <Row>
                <TitleContainer>
                    {statusImages[state]}
                    <Title>{title}</Title>
                </TitleContainer>
                <DescriptionContainer>
                    <span>{this.getDescription()}</span>
                </DescriptionContainer>
            </Row>
        );
    }
}
