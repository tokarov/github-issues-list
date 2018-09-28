import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import {IssuesList} from 'containers/issues-list';

export default () => (
    <Switch>
        <Redirect exact from="/" to="/issues-list" />
        <Route path="/issues-list" component={IssuesList} />
    </Switch>
);

