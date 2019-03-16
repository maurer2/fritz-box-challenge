import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import UpdateBar from './UpdateBar';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('UpdateBar', () => {
  const wrapper = shallow(<UpdateBar
    isUpdating={ true }
    isValid={ true }
  />);

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.setProps({ isUpdating: false });
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ isUpdating: true });
  });

  it('should have a timer wrapper', () => {
    expect(wrapper.find('Text').length).toBe(1);
  });

  it('should have text in timer wrapper', () => {
    wrapper.setProps({ isUpdating: true });
    expect(wrapper.find('Text').text()).toBe('Updating!');
  });

  it('should have text in timer wrapper', () => {
    wrapper.setProps({ isUpdating: false });
    wrapper.setProps({ isValid: false });

    expect(wrapper.find('Text').text()).toBe('Error!');
  });
});
