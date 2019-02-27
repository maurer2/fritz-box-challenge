import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UpdateBar from './UpdateBar';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('UpdateBar', () => {
  const wrapper = shallow(<UpdateBar isUpdating={ true }/>);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ isUpdating: false });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ isUpdating: true });
  });

  it('should have a timer wrapper', () => {
    expect(wrapper.find('UpdateText').length).toBe(1);
  });

  it('should have text in timer wrapper', () => {
    expect(wrapper.find('UpdateText').text()).toBe('Updating!');
  });
});
