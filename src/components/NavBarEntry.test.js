import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

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

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a title component', () => {
    expect(wrapper.find('NavBarButton').length).toBe(1);
  });

  it('should have text in component', () => {
    expect(wrapper.find('NavBarButton').text()).toBe('Model');
  });
});
