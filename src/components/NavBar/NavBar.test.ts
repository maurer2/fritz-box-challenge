import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import NavBar from './NavBar';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('NavBar', () => {
  const mockedHandleNavigation = jest.fn();
  const mockedUpdateIndicator = jest.fn();
  // const mockedMatchedMedia = jest.fn();
  const boxData = {
    branding: 'avm',
    model: 'FRITZ!Box 6590 Cable',
    restarts: '024',
    technology: 'Kabel',
  };

  // jsdom doesn't support matchmedia
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => ({
      matches: true,
    })),
  });

  const wrapper = shallow(
    <NavBar
      isUpdating={false}
      boxData={boxData}
      currentIndex={1}
      handleNavigation={mockedHandleNavigation}
      showIndicator
    />
  );

  wrapper.instance().updateIndicator = mockedUpdateIndicator;

  const wrapperDeep = mount(
    <NavBar
      isUpdating={false}
      boxData={boxData}
      currentIndex={1}
      handleNavigation={mockedHandleNavigation}
      showIndicator
    />
  );

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a BoxInformationWrapper component', () => {
    expect(wrapper.find('NavBarWrapper').length).toBe(1);
  });

  it('should have a Indicator component', () => {
    expect(wrapper.find('Indicator').length).toBe(1);
  });

  it('should have a NavBarList component', () => {
    expect(wrapper.find('NavBarList').length).toBe(1);
  });

  it('should have at least one NavBarEntry component', () => {
    expect(wrapper.find('NavBarEntry').length).toBeGreaterThan(0);
  });

  it('updateIndicator should be triggered when currentIndex prop changes', () => {
    wrapper.setProps({ currentIndex: 2 });
    wrapper.update();
    expect(wrapper.instance().updateIndicator).toBeCalled();
  });

  it('NavBarWrapper has space reserved for indicator', () => {
    wrapperDeep.setState({ height: 50 });
    wrapperDeep.update();
    expect(wrapperDeep.find('NavBarWrapper')).toHaveStyleRule('padding-top', '50px');
  });
});
