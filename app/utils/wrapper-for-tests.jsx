import React from 'react';
import {Provider} from 'react-redux';
import {appStore} from 'store';
import theme from 'styles/theme';
import {ThemeProvider} from 'styled-components';

export default (Component, additionalProps = {}) => props => (
    <ThemeProvider theme={theme}>
        <Provider store={appStore}>
            <Component {...props} {...additionalProps} />
        </Provider>
    </ThemeProvider>
);
