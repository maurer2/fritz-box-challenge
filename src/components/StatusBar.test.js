import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import StatusBar from './StatusBar';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('StatusBar', () => {
  const list = {
    branding: 'avm',
    model: 'FRITZ!Box 6590 Cable',
    restarts: '024',
    technology: 'Kabel',
  };

  const wrapper = shallow(<StatusBar list={ list } isUpdating={ false } />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a BoxInformationWrapper component', () => {
    expect(wrapper.find('BoxInformationWrapper').length).toBe(1);
  });

  it('should have children', () => {
    expect(wrapper.find('BoxInformationWrapper').children().length).toBeGreaterThan(0);
  });
});
