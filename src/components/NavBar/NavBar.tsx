import React, {
  useState, useRef, useEffect, createRef,
} from 'react';
import PropTypes from 'prop-types';

// import { throttle } from 'lodash';
import { NavBarEntry } from '../NavBarEntry';
import { DataProvider, BoxDataContext } from '../DataProvider';

import * as Styles from './NavBar.styles';
import * as Types from './NavBar.types';

const NavBar: React.FC<Types.NavBarProps> = ({}): JSX.Element => {
  // const throttledResizeHandler = useRef({});
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState('auto'); // prevent css transition on load

  const state = React.useContext(BoxDataContext);

  const oldIndex = useRef(-1);
  const showIndicator = useRef(true);
  const activeElement = createRef();

  const height = 5;

  const componentsToShow = 'componentsToShow' in state ? state.componentsToShow : [];
  const currentIndex = 0;

  const isUpdating = 'isUpdating' in state ? state.isUpdating : true;

  function handleNavigation(index: number): void {
    // oldIndex.current = currentIndex;
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
    // throttledResizeHandler.current = throttle(handleResize, 300);
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

const {
  string, number, func, bool,
} = PropTypes;

NavBar.propTypes = {
  componentsToShow: PropTypes.arrayOf(string).isRequired,
  handleNavigation: func.isRequired,
  currentIndex: number.isRequired,
  isUpdating: bool.isRequired,
};

export { NavBar };
