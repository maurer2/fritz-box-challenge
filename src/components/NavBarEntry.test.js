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
  const spiedHandleClick = jest.spyOn(NavBarEntry.prototype, 'handleClick');

  const wrapper = shallow(<NavBarEntry
    index={ 5 }
    entry="model"
    isActive={ false }
    handleNavigation={ mockedHandleNavigation }
  />);

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
    // wrapper.find('NavBarEntryWrapper').simulate('click');
    wrapper.find('NavBarEntryWrapper').props().onClick();
    wrapper.update();

    expect(mockedHandleNavigation).toHaveBeenCalled();
    expect(spiedHandleClick).toHaveBeenCalledTimes(1);
  });

  it('NavBarButton has correct styling', () => {
    const wrapperDeep = mount(<NavBarEntry />);

    expect(wrapperDeep.find('NavBarButton')).toHaveStyleRule('color', '#121212');

    wrapperDeep.setProps({ isActive: true });
    expect(wrapperDeep.find('NavBarButton')).toHaveStyleRule('color', '#080808');
  });
});
