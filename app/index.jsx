import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import {Router} from 'react-router';
import Login from 'components/login';
import theme from 'styles/theme';
import {history} from './browser-history';
import {appStore} from './store';
import Routes from './routes';

render(
    <Provider store={appStore}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <Login>
                    <Routes />
                </Login>
            </Router>
        </ThemeProvider>
    </Provider>,
    document.getElementById('main')
);
