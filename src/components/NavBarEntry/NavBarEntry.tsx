// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { FC } from 'react';
import { upperFirst } from 'lodash';

import * as Styles from './NavBarEntry.styles';
import * as Types from './NavBarEntry.types';

const NavBarEntry: FC<Types.NavBarEntryProps> = ({
  index,
  entry,
  isActive,
  handleNavigation,
  activeElementRef,
  isFullWidth,
}) => {
  function handleClick(event): void {
    event.preventDefault();
    handleNavigation(index);
  }

  return (
    <Styles.NavBarEntryWrapper
      onClick={(event): void => handleClick(event)}
      isFullWidth={isFullWidth}
      ref={activeElementRef}
    >
      <Styles.NavBarButton isActive={isActive}>{upperFirst(entry)}</Styles.NavBarButton>
    </Styles.NavBarEntryWrapper>
  );
};

export { NavBarEntry };
