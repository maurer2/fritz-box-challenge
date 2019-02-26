import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TimerComponent from './TimerComponent';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('TimerComponent dummy', () => {
  const wrapper = shallow(<TimerComponent isUpdating={ true }/>);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ isUpdating: false });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ isUpdating: true });
  });

  it('should have a timer wrapper', () => {
    expect(wrapper.find('TimerWrapper').length).toBe(1);
  });

  it('should hae text in timer wrapper', () => {
    expect(wrapper.find('TimerWrapper').text()).toBe('Updating!');
  });
});
