import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TextComponent from './TextComponent';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('TextComponent dummy', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<TextComponent text={ '123456' } />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should should contain spans with numbers', () => {
    const wrapper = shallow(<TextComponent text={ '123456' } />);

    expect(wrapper.children('span').length).toBeGreaterThan(0);
    expect(wrapper.children('span').length).toBe(6);
  });

  it('getter should work', () => {
    const wrapper = shallow(<TextComponent text={ '123456' } />);

    const getterNumberOfCharacters = wrapper.instance().numberOfCharacters;
    const { textSeparate } = wrapper.instance();

    expect(getterNumberOfCharacters).toBe(6);
    expect(textSeparate).toEqual(['1', '2', '3', '4', '5', '6']);
  });
});
