// @flow

import React, {Component} from 'react';

import type {IssueType} from '../types';

type PropsTypes = {
    issue: IssueType
}

export default class Issue extends Component<PropsTypes, void> {
    render() {
        const {issue: {number, title}} = this.props;
        return (
            <div>
                <div>{number}</div>
                <div>{title}</div>
            </div>
        );
    }
}
