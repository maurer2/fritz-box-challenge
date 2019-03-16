import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';

import Slide from './Slide';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('Slide', () => {
  const wrapper = mount(<Slide
    text="123456"
    title="title"
  />);

  const wrapper2 = shallow(<Slide
    text="123456"
    title="title"
  />);

  it('should match snapshot', () => {
    expect(toJson(wrapper2)).toMatchSnapshot();
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

  it('TextWrapper has correct styling', () => {
    expect(wrapper.find('TextWrapper')).toHaveStyleRule('font-weight', 'bold');

    wrapper.setProps({ text: 'short' });
    expect(wrapper.find('TextWrapper')).toHaveStyleRule('font-size', '27vw');

    wrapper.setProps({ text: 'verylong' });
    expect(wrapper.find('TextWrapper')).toHaveStyleRule('font-size', '16.875vw');
  });
});
