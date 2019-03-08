import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a title component', () => {
    expect(wrapper.find('NavBarEntryWrapper').length).toBe(1);
  });

  it('should have text in component', () => {
    expect(wrapper.find('NavBarEntryWrapper').text()).toBe('Model');
  });
});
