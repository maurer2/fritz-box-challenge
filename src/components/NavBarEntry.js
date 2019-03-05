import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const NavBarEntryWrapper = styled.button`
  display: block;
  margin: 1rem;
  font-weight: bold;
  appearance: none;
  background: none;
  border: 0;
`;

class NavBarEntry extends PureComponent {
  render() {
    return (
      <NavBarEntryWrapper>
        { upperFirst(this.props.entry) }
      </NavBarEntryWrapper>
    );
  }
}

NavBarEntry.propTypes = {
  entry: PropTypes.string,
};

export default NavBarEntry;
