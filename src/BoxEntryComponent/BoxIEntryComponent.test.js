import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BoxEntryComponent from './BoxEntryComponent';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('BoxEntryComponent', () => {
  const wrapper = shallow(<BoxEntryComponent entry="model" value="test" />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a title component', () => {
    expect(wrapper.find('BoxEntryTitle').length).toBe(1);
  });

  it('should have text in title component', () => {
    expect(wrapper.find('BoxEntryTitle').text()).toBe('Model');
  });

  it('should have a value component', () => {
    expect(wrapper.find('BoxEntryValue').length).toBe(1);
  });

  it('should have text in value component', () => {
    expect(wrapper.find('BoxEntryValue').text()).toBe('test');
  });
});
