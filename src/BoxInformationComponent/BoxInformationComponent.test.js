import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BoxInformationComponent from './BoxInformationComponent';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('BoxInformationComponent', () => {
  const list = {
    branding: 'avm',
    model: 'FRITZ!Box 6590 Cable',
    restarts: '024',
    technology: 'Kabel',
  };

  const wrapper = shallow(<BoxInformationComponent list={ list } isUpdating={ false } />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
