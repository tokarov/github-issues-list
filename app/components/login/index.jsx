// @flow

import React, {Component, Fragment} from 'react';
import styled, {withTheme} from 'styled-components';
import {buttons, labels, headers} from 'data/constants';
import type {Node} from 'react';

type PropsTypes = {
    children: Node
}
type StateTypes = {
    login: string,
    password: string,
    isEntered: boolean
}
const LoginForm = styled.div`
  height: ${({theme}) => theme.size.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Logout = styled.span`
  position: absolute;
  right: 10px;
  text-decoration: underline;
`;
const Row = styled.div`
  margin-bottom: 10px;
`;
const Label = styled.label`
  margin-right: ${({marginRight}) => marginRight}px;
`;
const LoginButton = styled.button`
  width: 282px;
`;

class Login extends Component<PropsTypes, StateTypes> {
    static getDerivedStateFromProps(props:PropsTypes, state:StateTypes) {
        return {...state, isEntered: localStorage.getItem('btoa') !== null};
    }

    state = {
        login: '',
        password: '',
        isEntered: localStorage.getItem('btoa') !== null
    };

    handleInputChange = ({target}) => {
        this.setState({[target.id]: target.value});
    };

    handleSubmitClick = () => {
        const {login, password} = this.state;
        if (login.length > 0 && password.length > 0) {
            localStorage.setItem('btoa', window.btoa(`${login}:${password}`));
            this.setState({isEntered: true});
        }
    };

    handleLogout = () => {
        localStorage.removeItem('btoa');
        this.setState({isEntered: false});
    };

    render() {
        const {login, password, isEntered} = this.state;
        const {children} = this.props;
        return (
            <Fragment>
                {!isEntered
                && (
                    <LoginForm>
                        <Row>{headers.LOGIN}</Row>
                        <Row>
                            <Label
                                marginRight="66"
                                htmlFor="login"
                            >
                                {labels.LOGIN}
                            </Label>
                            <input
                                data-selenium="login-input"
                                id="login"
                                type="text"
                                value={login}
                                onChange={this.handleInputChange}
                            />
                        </Row>
                        <Row>
                            <Label
                                marginRight="43"
                                htmlFor="password"
                            >
                                {labels.PASSWORD}
                            </Label>
                            <input
                                data-selenium="password-input"
                                id="password"
                                type="password"
                                value={password}
                                onChange={this.handleInputChange}
                            />
                        </Row>
                        <LoginButton
                            data-selenium="login-button"
                            onClick={this.handleSubmitClick}
                        >
                            {buttons.LOGIN}
                        </LoginButton>
                    </LoginForm>
                )}
                {isEntered
                && (
                    <div>
                        <Logout
                            data-selenium="logout-button"
                            onClick={this.handleLogout}
                        >
                            {buttons.LOGOUT}
                        </Logout>
                        {children}
                    </div>
                )}
            </Fragment>
        );
    }
}

export default withTheme(Login);
