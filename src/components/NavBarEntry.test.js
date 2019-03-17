import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import NavBarEntry from './NavBarEntry';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('NavBarEntry', () => {
  const mockedHandleNavigation = jest.fn();

  const wrapper = shallow(<NavBarEntry
    index={ 5 }
    entry="model"
    isActive={ false }
    handleNavigation={ mockedHandleNavigation }
  />);

  // const spy = jest.spyOn(NavBarEntry.prototype, 'handleClick');

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have wrapper component', () => {
    expect(wrapper.find('NavBarEntryWrapper').length).toBe(1);
  });

  it('should have a title component', () => {
    expect(wrapper.find('NavBarButton').length).toBe(1);
  });

  it('should have text in component', () => {
    expect(wrapper.find('NavBarButton').text()).toBe('Model');
  });

  it('Test click event', () => {
    //const spy = jest.spyOn(wrapper.instance(), 'handleClick');

    wrapper.find('NavBarEntryWrapper').simulate('click');
    wrapper.update();
    
    expect(mockedHandleNavigation.mock.calls.length).toEqual(1);
    // expect(spy).toHaveBeenCalled();
  });

  /*
  it('NavBarButton has correct styling', () => {
    expect(wrapper.find('NavBarButton')).toHaveStyleRule('color', 'black');

    wrapper.setProps({ isActive: true });
    expect(wrapper.find('NavBarButton')).toHaveStyleRule('color', 'white');
  });
  */
});
