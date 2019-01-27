import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

import TextComponent from '../TextComponent/TextComponent';

describe('TextComponent dummy', () => {
  it('should match snapshot', () => {
    let wrapper = shallow(<TextComponent text={ '123456' } />);
    
    expect(wrapper).toMatchSnapshot();
});

  it('should render text-wrapper', () => {
    let wrapper = shallow(<TextComponent text={ '123456' } />);

    expect(wrapper.hasClass('text-wrapper')).toBe(true);
  });

  it('should should contain spans with numbers', () => {
    let wrapper = shallow(<TextComponent text={ '123456' } />);
        
    expect(wrapper.children('span').length).toBeGreaterThan(0);
    expect(wrapper.children('span').length).toBe(6);
  });

  it('getter should work', () => {
    let wrapper = shallow(<TextComponent text={ '123456' } />);

    const getterNumberOfCharacters = wrapper.instance().numberOfCharacters;
    const textSeparate = wrapper.instance().textSeparate;
    
    expect(getterNumberOfCharacters).toBe(6);
    expect(textSeparate).toEqual(['1', '2', '3', '4', '5', '6']);
  });
});