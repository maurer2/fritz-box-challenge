import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import AppContainer from './AppContainer';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('AppContainer', () => {
  process.env.REACT_APP_MODE = 'dev';
  // const mockHandleNavigation = jest.fn;
  const wrapper = shallow(<AppContainer />);

  // wrapper.instance().handleNavigation = mockHandleNavigation;

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<AppContainer />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('handleNavigation updates currentIndex in state', () => {
    const { currentIndex } = wrapper.state();

    wrapper.instance().handleNavigation(currentIndex + 1);
    wrapper.update();

    expect(wrapper.state().currentIndex).toBe(currentIndex + 1);
  });

  it('handleClick changes currentIndex in state or resets to zero when last', () => {
    const currentIndex = 0;

    wrapper.setState({
      currentIndex,
      componentsToShow: ['test 1', 'test 2'],
    });

    wrapper.instance().handleClick();
    wrapper.update();

    expect(wrapper.state().currentIndex).toBe(currentIndex + 1);

    wrapper.instance().handleClick();
    wrapper.update();

    expect(wrapper.state().currentIndex).toBe(0);
  });

  it('mapBoxData maps values correctly', () => {
    const componentsToShow = ['branding', 'firmware', 'cat'];
    const boxData = {
      branding: 'Branding',
      firmware: 'Firmware',
    };
    const runtime = 'Runtime';
    const age = 'Age';

    wrapper.setState({ componentsToShow });
    wrapper.update();

    const mappedBoxData = wrapper.instance().mapBoxData(boxData, runtime, age);

    expect(mappedBoxData).toEqual({ ...boxData, runtime, age, cat: '' });
  });
});
