import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import UpdateBar from './UpdateBar';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('UpdateBar', () => {
  const wrapper = shallow(<UpdateBar isUpdating isValid />);

  const wrapperDeep = mount(<UpdateBar isUpdating isValid />);

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

  it('SlideYTransition has space reserved for indicator', () => {
    expect(wrapperDeep.find('SlideYTransition')).toHaveStyleRule('position', 'absolute');
  });
});
