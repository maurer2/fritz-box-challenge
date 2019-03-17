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

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });  

  it('should should contain spans with numbers', () => {
    expect(wrapper.find('.character').length).toBeGreaterThan(0);
    expect(wrapper.find('.character').length).toBe(6);
  });

  it('should have a wrapper', () => {
    expect(wrapper.find('Wrapper').length).toBe(1);
  });

  it('should have a title', () => {
    expect(wrapper.find('TitleWrapper').length).toBe(1);
    expect(wrapper.find('TitleWrapper').text()).toBe('Title');
  });

  it('should have a text wrapper with props', () => {
    expect(wrapper.find('TextWrapper').length).toBe(1);

    expect(wrapper.find('TextWrapper').props().characterCount).toBe(6);
  });

  it('Wrapper has correct styling', () => {
    expect(wrapper.find('Wrapper')).toHaveStyleRule('user-select', 'none');
  });

  it('TitleWrapper has correct styling', () => {
    expect(wrapper.find('TitleWrapper')).toHaveStyleRule('font-size', '5vw');
  });

  it('TextWrapper has correct styling', () => {
    expect(wrapper.find('TextWrapper')).toHaveStyleRule('font-weight', 'bold');

    wrapper.setProps({ text: 'short' });
    expect(wrapper.find('TextWrapper')).toHaveStyleRule('font-size', '27vw');

    wrapper.setProps({ text: 'verylong' });
    expect(wrapper.find('TextWrapper')).toHaveStyleRule('font-size', '16vw');
  });
});
