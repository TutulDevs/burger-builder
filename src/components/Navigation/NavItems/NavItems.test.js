import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({adapter: new Adapter()});

describe('<NavItems />', ()=> {
    
    let wrapper ;

    // run this before each test
    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    })

    it('should render two <NavItem /> if not auth', ()=> {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    })

    it('should render three <NavItem /> if auth', ()=> {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavItem)).toHaveLength(3);
    })

    it('should render logout <NavItem /> if auth', ()=> {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavItem link='/logout'>LogOut</NavItem>)).toEqual(true);
    })
})