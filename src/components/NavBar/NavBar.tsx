import React, { useState, useRef, useEffect, createRef, useContext } from 'react';

// import { throttle } from 'lodash';
import { NavBarEntry } from '../NavBarEntry';
import { BoxDataContext } from '../DataProvider';

import * as Styles from './NavBar.styles';

const NavBar = () => {
  const state = useContext(BoxDataContext);

  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState<string | number>('auto'); // prevent css transition on load
  const oldIndex = useRef(-1);
  const showIndicator = useRef(true);
  const activeElement = createRef<HTMLLIElement>();

  const {
    visibleComponents,
    currentIndex,
    isUpdating
  } = state;
  const height = 5;

  function handleNavigation(newCurrentIndex: number): void {
    oldIndex.current = currentIndex;

    state.updateCurrentIndex(newCurrentIndex);
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

  useEffect(() => {
    const activeElementHasChanged = currentIndex !== oldIndex.current;

    if (activeElementHasChanged) {
      oldIndex.current = currentIndex;

      updateIndicator();
    }
  });

  return (
    <Styles.NavBar $reservedSpaceTop={height} $isUpdating={isUpdating}>
      {showIndicator.current && <Styles.Indicator offset={offset} width={width} height={height} />}
      <Styles.NavBarList $isRow={showIndicator}>
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
