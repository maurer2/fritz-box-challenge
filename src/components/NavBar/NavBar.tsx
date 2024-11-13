import React, { useState, useRef, useLayoutEffect } from 'react';

// import { throttle } from 'lodash';
import { NavBarEntry } from '../NavBarEntry';
import useBoxDataContext from '../../hooks/useBoxDataContext/useBoxDataContext';

import * as Styles from './NavBar.styles';

const NavBar = () => {
  const { _state, visibleComponents, currentIndex, isUpdating, updateCurrentIndex } =
    useBoxDataContext();
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState<string | number>('auto'); // prevent css transition on load
  const oldIndex = useRef(-1);
  const showIndicator = useRef(true);
  const activeElement = useRef<HTMLLIElement>(null);

  const height = 5;

  function handleNavigation(newCurrentIndex: number): void {
    oldIndex.current = currentIndex;

    updateCurrentIndex(newCurrentIndex);
  }

  function updateIndicator(): void {
    if (activeElement.current == null) {
      return;
    }

    const activeElementBB = activeElement.current.getBoundingClientRect();
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;

    setOffset(activeElementBB.x);
    setWidth(activeElementBB.width);

    showIndicator.current = isLargeScreen;
  }

  useLayoutEffect(() => {
    const activeElementHasChanged = currentIndex !== oldIndex.current;

    if (activeElementHasChanged) {
      oldIndex.current = currentIndex;

      updateIndicator();
    }
  });

  if (_state === 'error') {
    return null;
  }

  return (
    <Styles.NavBar $reservedSpaceTop={height} $isUpdating={isUpdating}>
      {showIndicator.current && <Styles.Indicator offset={offset} width={width} height={height} />}
      <Styles.NavBarList $isRow={showIndicator.current}>
        {visibleComponents.map((entry, index) => (
          <NavBarEntry
            index={index}
            entry={entry}
            $isActive={currentIndex === index}
            handleNavigation={(newCurrentIndex: number): void => handleNavigation(newCurrentIndex)}
            // only active element gets ref otherwise last child always active
            activeElementRef={currentIndex === index ? activeElement : null}
            key={entry}
            $isFullWidth={!showIndicator}
          />
        ))}
      </Styles.NavBarList>
    </Styles.NavBar>
  );
};

export { NavBar };
