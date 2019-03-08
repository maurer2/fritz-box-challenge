import React from 'react';
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
