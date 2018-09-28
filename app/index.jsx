import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import {Router} from 'react-router';
import {createBrowserHistory} from 'history';
import theme from 'styles/theme';
import {appStore} from './store';
import Routes from './routes';

const history = createBrowserHistory();
render(
    <Provider store={appStore}>
        <ThemeProvider theme={theme}>
            <div>
                <Router history={history}>
                    <Routes />
                </Router>
            </div>
        </ThemeProvider>
    </Provider>,
    document.getElementById('main')
);
