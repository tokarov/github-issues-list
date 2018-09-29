import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {appStore} from 'store';
import theme from 'styles/theme';

export default (Component, additionalProps = {}) => props => (
    <ThemeProvider theme={theme}>
        <Provider store={appStore}>
            <Component {...props} {...additionalProps} />
        </Provider>
    </ThemeProvider>
);
