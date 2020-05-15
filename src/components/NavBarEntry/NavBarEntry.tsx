import React from 'react';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash';

import * as Styles from './NavBarEntry.styles';
import * as Types from './NavBarEntry.types';

const NavBarEntry: React.FC<Types.NavBarEntryProps> = ({ index, entry, isActive, handleNavigation, activeElementRef, isFullWidth }) => {
  function handleClick(): void {
    handleNavigation(index);
  }

  return (
    <Styles.NavBarEntryWrapper
      onClick={handleClick}
      isFullWidth={isFullWidth}
      ref={activeElementRef}
    >
      <Styles.NavBarButton isActive={isActive}>
        { upperFirst(entry) }
      </Styles.NavBarButton>
    </Styles.NavBarEntryWrapper>
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
