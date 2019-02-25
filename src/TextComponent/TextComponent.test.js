import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TextComponent from './TextComponent';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('TextComponent dummy', () => {
  const wrapper = shallow(<TextComponent text={ '123456' } title={ 'title' } />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should should contain spans with numbers', () => {
    expect(wrapper.find('.character').length).toBeGreaterThan(0);
    expect(wrapper.find('.character').length).toBe(6);
  });

  it('getter should work', () => {
    const getterNumberOfCharacters = wrapper.instance().numberOfCharacters;
    const { textSeparate } = wrapper.instance();

    expect(getterNumberOfCharacters).toBe(6);
    expect(textSeparate).toEqual(['1', '2', '3', '4', '5', '6']);
  });
});
