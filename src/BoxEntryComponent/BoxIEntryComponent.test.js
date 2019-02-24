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
});
