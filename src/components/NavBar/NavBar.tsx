import React, { FC, useState, useRef, useEffect, createRef } from 'react';

// import { throttle } from 'lodash';
import { NavBarEntry } from '../NavBarEntry';
import { BoxDataContext } from '../DataProvider';

import * as Styles from './NavBar.styles';
import * as Types from './NavBar.types';

const NavBar: FC<Types.NavBarProps> = (): JSX.Element => {
  const state = React.useContext(BoxDataContext);

  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState('auto'); // prevent css transition on load

  const oldIndex = useRef(-1);
  const showIndicator = useRef(true);
  const activeElement = createRef();

  const height = 5;

  const componentsToShow = 'componentsToShow' in state ? state.componentsToShow : [];
  const currentIndex = 'currentIndex' in state ? state.currentIndex : 0;

  const isUpdating = 'isUpdating' in state ? state.isUpdating : true;

  function handleNavigation(newCurrentIndex: number): void {
    oldIndex.current = currentIndex;

    state.updateCurrentIndex(newCurrentIndex);
    // setCurrentIndex(index);
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
    <Styles.NavBar reservedSpaceTop={height} isUpdating={isUpdating}>
      {showIndicator.current && <Styles.Indicator offset={offset} width={width} height={height} />}
      <Styles.NavBarList isRow={showIndicator}>
        {componentsToShow.map((entry, index) => (
          <NavBarEntry
            index={index}
            entry={entry}
            isActive={currentIndex === index}
            handleNavigation={handleNavigation}
            // only active element gets ref otherwise last child always active
            activeElementRef={currentIndex === index ? activeElement : null}
            key={index}
            isFullWidth={!showIndicator}
          />
        ))}
      </Styles.NavBarList>
    </Styles.NavBar>
  );
};

export { NavBar };
