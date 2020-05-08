import React, { useState, useRef, useEffect, createRef } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import throttle from 'lodash.throttle';

import { NavBarEntry } from '../NavBarEntry';

const SlideYTransition = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  > .${props => props.transitionName}-appear {
    transform: translateY(100%);
    transition: transform 500ms ease-out;

    &.${props => props.transitionName}-appear-active {
      transform: translateY(0);
    }
  }

  > .${props => props.transitionName}-leave {
    transform: translateY(0);
    transition: transform 500ms ease-in;

    &.${props => props.transitionName}-leave-active {
      transform: translateY(100%);
    }
  }
`;

const NavBarWrapper = styled.footer`
  position: relative;
  display: block;
  padding-top: ${props => props.reservedSpaceTop}px;
`;

const Indicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.width === 'auto' ? props.width : `${props.width}px`)}; // might cause layout thrashing
  height: ${props => props.height}px;
  transform: translateX(${props => props.offset}px);
  transition: transform 500ms, width 500ms;
  background: white;
`;

const NavBarList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: ${props => (props.isRow ? 'no-wrap' : 'wrap')};
  justify-content: space-between;
  list-style: none;
  background: #BDBDBD;
`;

const Wrapper = ({ children }) => {
  const transitionName = 'slide-vertically';

  return (
    <SlideYTransition transitionName={ transitionName }>
      <CSSTransitionGroup
        component={ React.Fragment }
        transitionAppear={ false }
        transitionEnter={ false }
        transitionName={ transitionName }
        transitionAppearTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionEnterTimeout={ 0 }
      >
        { children }
      </CSSTransitionGroup>
    </SlideYTransition>
  );
};

const NavBar = ({ componentsToShow, currentIndex, handleNavigation }) => {
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState('auto'); // prevent css transition on load

  const oldIndex = useRef(-1);

  const offsetValue = useRef(offset);

  useEffect(() => {
    offsetValue.current = offset;
  });

  const showIndicator = useRef(true);
  const activeElement = createRef();

  const height = 5;

  useEffect(() => {
    const activeElementHasChanged = currentIndex !== oldIndex.current;

    if (activeElementHasChanged) {
      oldIndex.current = currentIndex;

      updateIndicator(offset);
    }
  }, [currentIndex, oldIndex]);

  useEffect(() => {
    const throttledResize = throttle(handleResize, 1000);

    window.addEventListener('resize', throttledResize);

    return () => {
      window.removeEventListener('resize', throttledResize);
    };
  }, []);

  function handleResize() {
    updateIndicator(offset);
  }

  function updateIndicator(offsetParam) {
    console.log(oldIndex, width, offsetValue, offsetParam);

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
    <Wrapper>
      <NavBarWrapper reservedSpaceTop={ height }>
        { showIndicator && <Indicator
          offset={ offset }
          width={ width }
          height={ height }
        />
        }
        <NavBarList isRow={ showIndicator }>
          { componentsToShow.map((entry, index) => (
            <NavBarEntry
              index={ index }
              entry={ entry }
              isActive={ currentIndex === index }
              handleNavigation={ handleNavigation }
              // only active element gets ref otherwise last child always active
              activeElementRef={ (currentIndex === index) ? activeElement : null }
              key={ index }
              isFullWidth={ !showIndicator }
            />
          ))}
        </NavBarList>
      </NavBarWrapper>
    </Wrapper>
  );
};

const { string, number, func, node } = PropTypes;

NavBar.propTypes = {
  componentsToShow: PropTypes.arrayOf(string).isRequired,
  handleNavigation: func.isRequired,
  currentIndex: number.isRequired,
};

Wrapper.propTypes = {
  children: node.isRequired,
};

export { NavBar };
