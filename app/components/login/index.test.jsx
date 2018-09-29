import React from 'react';
import {mount, shallow} from 'enzyme';
import wrapperForTest from 'utils/wrapper-for-tests';

import Login from '.';

const Wrapper = wrapperForTest(Login);

describe('Login', () => {
    let wrapper;
    afterEach(() => {
        wrapper.unmount();
    });

    it('should match snapshot', () => {
        wrapper = shallow(<Wrapper />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should logon and set btoa to localStorage', () => {
        wrapper = mount(<Wrapper />);
        wrapper.find('[data-selenium="login-input"]').simulate('change', {target: {value: 'test', id: 'login'}});
        wrapper.find('[data-selenium="password-input"]').simulate('change', {target: {value: 'test', id: 'password'}});
        wrapper.find('[data-selenium="login-button"]').hostNodes().simulate('click');
        expect(localStorage.getItem('btoa')).toEqual('dGVzdDp0ZXN0');
    });
    it('should logout and remove btoa from localStorage', () => {
        localStorage.setItem('btoa', 'test');
        wrapper = mount(<Wrapper />);
        wrapper.find('[data-selenium="logout-button"]').hostNodes().simulate('click');
        expect(localStorage.getItem('btoa')).toEqual(null);
    });
});
