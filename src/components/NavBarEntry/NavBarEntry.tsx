import React from 'react';
import { upperFirst } from 'lodash';

import * as Styles from './NavBarEntry.styles';
import * as Types from './NavBarEntry.types';

const NavBarEntry: React.FC<Types.NavBarEntryProps> = ({
  index,
  entry,
  isActive,
  handleNavigation,
  activeElementRef,
  isFullWidth,
}): JSX.Element => {
  function handleClick(): void {
    handleNavigation(index);
  }

  return (
    <Styles.NavBarEntryWrapper
      onClick={handleClick}
      isFullWidth={isFullWidth}
      ref={activeElementRef}
    >
      <Styles.NavBarButton isActive={isActive}>{upperFirst(entry)}</Styles.NavBarButton>
    </Styles.NavBarEntryWrapper>
  );
};

export { NavBarEntry };
