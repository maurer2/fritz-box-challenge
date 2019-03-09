import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const NavBarEntryWrapper = styled.li`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
`;

const defaultButton = styled.button`
  padding: 1rem;
  appearance: none;
  background: none;
  outline: none;
`;

const NavBarButton = styled(defaultButton)`
  display: block;
  width: 100%;
  border: 0;
  border-top-width: 4px;
  border-top-style: solid;
  border-top-color: ${props => (props.isActive ? 'black' : 'transparent')};
  font-size: 1rem;
`;

const NavBarEntry = (props) => {
  const { index, isActive, entry, handleNavigation } = props;

  const handleClick = () => {
    handleNavigation(index);
  };

  return (
    <NavBarEntryWrapper onClick={ handleClick }>
      <NavBarButton isActive={ isActive }>
        { upperFirst(entry) }
      </NavBarButton>
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
