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
  transform: ${props => (props.isActive ? 'scale(1.5)' : 'scale(1)')};
  transition: transform 500ms;
`;

class NavBarEntry extends PureComponent {
  render() {
    return (
      <NavBarEntryWrapper isActive={ this.props.isActive }>
        { upperFirst(this.props.entry) }
      </NavBarEntryWrapper>
    );
  }
}

NavBarEntry.propTypes = {
  entry: PropTypes.string,
  isActive: PropTypes.bool,
};

export default NavBarEntry;
