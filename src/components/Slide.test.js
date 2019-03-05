import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Slide from './Slide';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('Slide', () => {
  const wrapper = shallow(<Slide text={ '123456' } title={ 'title' } />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should should contain spans with numbers', () => {
    expect(wrapper.find('.character').length).toBeGreaterThan(0);
    expect(wrapper.find('.character').length).toBe(6);
  });

  it('should have a title', () => {
    expect(wrapper.find('TitleWrapper').length).toBe(1);
  });

  it('should have a text wrapper', () => {
    expect(wrapper.find('TextWrapper').length).toBe(1);
  });
});
