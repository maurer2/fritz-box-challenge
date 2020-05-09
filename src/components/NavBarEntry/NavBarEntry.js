import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const NavBarEntryWrapper = styled.li`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${(props) => (props.isFullWidth ? '33%' : '0')};
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
  font-size: 1rem;
  color: ${(props) => (props.isActive ? '#080808' : '#121212')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  transition: color 500ms;
`;

const NavBarEntry = ({ index, entry, isActive, handleNavigation, activeElementRef, isFullWidth }) => {
  function handleClick() {
    handleNavigation(index);
  }

  return (
    <NavBarEntryWrapper
      onClick={handleClick}
      isFullWidth={isFullWidth}
      ref={activeElementRef}
    >
      <NavBarButton isActive={isActive}>
        { upperFirst(entry) }
      </NavBarButton>
    </NavBarEntryWrapper>
  );
};

const { string, number, bool, func, shape, instanceOf } = PropTypes;

NavBarEntry.defaultProps = {
  activeElementRef: shape({
    current: null,
  }),
};

NavBarEntry.propTypes = {
  index: number.isRequired,
  entry: string.isRequired,
  isActive: bool.isRequired,
  handleNavigation: func.isRequired,
  activeElementRef: shape({
    current: instanceOf(HTMLElement),
  }),
  isFullWidth: bool.isRequired,
};

export { NavBarEntry };
