import React, { useState, useRef, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

// import { throttle } from 'lodash';
import * as Styles from './NavBar.styles';

import { NavBarEntry } from '../NavBarEntry';

const TransitionWrapper = ({ children }) => {
  const transitionName = 'slide-vertically';

  return (
    <Styles.SlideYTransition transitionName={transitionName}>
      <CSSTransitionGroup
        component={React.Fragment}
        transitionAppear={false}
        transitionEnter={false}
        transitionName={transitionName}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}
        transitionEnterTimeout={0}
      >
        { children }
      </CSSTransitionGroup>
    </Styles.SlideYTransition>
  );
};

const NavBar = ({ componentsToShow, currentIndex, handleNavigation }) => {
  // const throttledResizeHandler = useRef({});
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState('auto'); // prevent css transition on load

  const oldIndex = useRef(-1);
  const showIndicator = useRef(true);
  const activeElement = createRef();

  const height = 5;

  useEffect(() => {
    // throttledResizeHandler.current = throttle(handleResize, 300);
    const activeElementHasChanged = currentIndex !== oldIndex.current;

    if (activeElementHasChanged) {
      oldIndex.current = currentIndex;

      updateIndicator();
    }
  });

  /*
  function handleResize() {
    updateIndicator();
  }
  */

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

  return (
    <Styles.NavBar>
      <TransitionWrapper>
        <Styles.NavBarWrapper reservedSpaceTop={height}>
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
        </Styles.NavBarWrapper>
      </TransitionWrapper>
    </Styles.NavBar>
  );
};

const { string, number, func, node } = PropTypes;

NavBar.propTypes = {
  componentsToShow: PropTypes.arrayOf(string).isRequired,
  handleNavigation: func.isRequired,
  currentIndex: number.isRequired,
};

TransitionWrapper.propTypes = {
  children: node.isRequired,
};

export { NavBar };
