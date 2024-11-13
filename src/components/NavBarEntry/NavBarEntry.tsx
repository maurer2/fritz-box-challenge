import type { MouseEvent } from 'react';
import React from 'react';
import { upperFirst } from 'lodash';

import * as Styles from './NavBarEntry.styles';
import type { NavBarEntryProps } from './NavBarEntry.types';

const NavBarEntry = ({
  index,
  entry,
  handleNavigation,
  activeElementRef,
  $isActive,
  $isFullWidth,
}: NavBarEntryProps) => {
  function handleClick(event: MouseEvent<HTMLLIElement>): void {
    event.preventDefault();

    handleNavigation(index);
  }

  return (
    <Styles.NavBarEntryWrapper
      onClick={(event) => handleClick(event)}
      ref={activeElementRef}
      $isFullWidth={$isFullWidth}
    >
      <Styles.NavBarButton $isActive={$isActive}>{upperFirst(entry)}</Styles.NavBarButton>
    </Styles.NavBarEntryWrapper>
  );
};

export { NavBarEntry };
