import React, { useState, useRef, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

// import { throttle } from 'lodash';
import * as Styles from './NavBar.styles';
import * as Types from './NavBar.types';

import { NavBarEntry } from '../NavBarEntry';

const NavBar: React.FC<Types.NavBarProps> = ({ componentsToShow, currentIndex, handleNavigation, isUpdating }) => {
  // const throttledResizeHandler = useRef({});
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState('auto'); // prevent css transition on load

  const oldIndex = useRef(-1);
  const showIndicator = useRef(true);
  const activeElement = createRef();

  const height = 5;

  function updateIndicator() {
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
    // throttledResizeHandler.current = throttle(handleResize, 300);
    const activeElementHasChanged = currentIndex !== oldIndex.current;

    if (activeElementHasChanged) {
      oldIndex.current = currentIndex;

      updateIndicator();
    }
  });

  return (
    <Styles.NavBar reservedSpaceTop={height} isUpdating={isUpdating}>
      { showIndicator.current && (
      <Styles.Indicator
        offset={offset}
        width={width}
        height={height}
      />
      )}
      <Styles.NavBarList isRow={showIndicator}>
        { componentsToShow.map((entry, index) => (
          <NavBarEntry
            index={index}
            entry={entry}
            isActive={currentIndex === index}
            handleNavigation={handleNavigation}
            // only active element gets ref otherwise last child always active
            activeElementRef={(currentIndex === index) ? activeElement : null}
            key={index}
            isFullWidth={!showIndicator}
          />
        ))}
      </Styles.NavBarList>
    </Styles.NavBar>
  );
};

const { string, number, func, bool } = PropTypes;

NavBar.propTypes = {
  componentsToShow: PropTypes.arrayOf(string).isRequired,
  handleNavigation: func.isRequired,
  currentIndex: number.isRequired,
  isUpdating: bool.isRequired,
};

export { NavBar };
