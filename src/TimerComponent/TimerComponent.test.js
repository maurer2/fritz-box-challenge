import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TimerComponent from './TimerComponent';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('TimerComponent dummy', () => {
  const wrapper = shallow(<TimerComponent/>);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
