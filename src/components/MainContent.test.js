import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MainContent from './MainContent';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('MainContent', () => {
  const mockedHandleClick = jest.fn();

  const wrapper = shallow(<MainContent
    isUpdating={ false }
    onClick={ mockedHandleClick }
  />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
