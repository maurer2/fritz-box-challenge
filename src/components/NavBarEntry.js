import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const NavBarEntryWrapper = styled.button`
  padding: 1rem;
  border: 0;
  border-top-width: 4px;
  border-top-style: solid;
  border-top-color: ${props => (props.isActive ? 'black' : 'transparent')};
  appearance: none;
  font-size: 1rem;
  background: none;
  outline: none;
`;

const NavBarEntry = (props) => {
  const { index, isActive, entry, handleNavigation } = props;

  return (
    <NavBarEntryWrapper isActive={ isActive } onClick={ event => handleNavigation(index, event) }>
      { upperFirst(entry) }
    </NavBarEntryWrapper>
  );
};

NavBarEntry.propTypes = {
  index: PropTypes.number,
  entry: PropTypes.string,
  isActive: PropTypes.bool,
  handleNavigation: PropTypes.func,
};

export default NavBarEntry;
