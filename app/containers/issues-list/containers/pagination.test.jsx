import React from 'react';
import {shallow} from 'enzyme';

import {Pagination} from './pagination';

const mockPagination = {
    hasNextPage: true,
    hasPreviousPage: true,
    totalCount: 100,
    endCursor: 20,
    startCursor: 10,
    offset: ''
};
const mockSetOffSet = jest.fn();

describe('Pagination', () => {
    let wrapper;
    afterEach(() => {
        wrapper.unmount();
    });

    it('should match snapshot', () => {
        wrapper = shallow(<Pagination pagination={mockPagination} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('should set previous page offset', () => {
        wrapper = shallow(<Pagination
            pagination={{...mockPagination, hasPreviousPage: false}}
            setOffSet={mockSetOffSet}
        />);
        wrapper.find('PaginationButton').at(0).simulate('click');
        expect(mockSetOffSet).not.toHaveBeenCalled();
    });
    it('not should set next page offset', () => {
        wrapper = shallow(<Pagination
            pagination={{...mockPagination, hasNextPage: false}}
            setOffSet={mockSetOffSet}
        />);
        wrapper.find('PaginationButton').at(1).simulate('click');
        expect(mockSetOffSet).not.toHaveBeenCalled();
    });
    it('should set previous page offset', () => {
        wrapper = shallow(<Pagination pagination={mockPagination} setOffSet={mockSetOffSet} />);
        wrapper.find('PaginationButton').at(0).simulate('click');
        expect(mockSetOffSet).toHaveBeenCalledWith('before: "10"');
    });
    it('should set next page offset', () => {
        wrapper = shallow(<Pagination pagination={mockPagination} setOffSet={mockSetOffSet} />);
        wrapper.find('PaginationButton').at(1).simulate('click');
        expect(mockSetOffSet).toHaveBeenCalledWith('after: "10"');
    });
});
