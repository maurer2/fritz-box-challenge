import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { MainContent } from './MainContent';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('MainContent', () => {
  const mockedHandleClick = jest.fn();

  const wrapper = shallow(<MainContent onClick={mockedHandleClick} />);

  const wrapperDeep = mount(<MainContent onClick={mockedHandleClick} />);

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a MainWrapper', () => {
    expect(wrapper.find('MainWrapper').length).toBe(1);
  });

  it('MainWrapper has styles', () => {
    expect(wrapperDeep.find('MainWrapper')).toHaveStyleRule('width', '100%');
  });
});
