import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from './NavBar';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('NavBar', () => {
  const boxData = {
    branding: 'avm',
    model: 'FRITZ!Box 6590 Cable',
    restarts: '024',
    technology: 'Kabel',
  };

  const mockedHandleNavigation = jest.fn();

  const wrapper = shallow(<NavBar
    isUpdating={ false }
    boxData={ boxData }
    currentIndex={ 1 }
    handleNavigation={ mockedHandleNavigation }
  />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a BoxInformationWrapper component', () => {
    expect(wrapper.find('NavBarWrapper').length).toBe(1);
  });

  it('should have children', () => {
    expect(wrapper.find('NavBarWrapper').children().length).toBeGreaterThan(0);
  });
});
