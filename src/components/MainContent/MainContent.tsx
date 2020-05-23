import React, { useState, useRef } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import { Slide } from '../Slide';
import { DataProvider, BoxDataContext } from '../DataProvider';

import * as Styles from './MainContent.styles';
import * as Types from './MainContent.types';

const MainContent: React.FC<Types.MainContentProps> = ({}): JSX.Element => {
  // const [currentIndex, setCurrentIndex] = useState(0 as number);
  const oldIndex = useRef(0 as number);

  const state = React.useContext(BoxDataContext);

  const componentsToShow = 'componentsToShow' in state ? state.componentsToShow : [];
  const boxData = 'boxData' in state ? state.boxData : {};
  const currentIndex = 'currentIndex' in state ? state.currentIndex : 0;

  console.log('currentIndex' in state);

  const slideInFromRight = currentIndex > oldIndex.current;
  const title = componentsToShow[currentIndex] || '';
  const text = (boxData as any)[title] || '';

  function handleClick(): void {
    const lastIndex = componentsToShow.length - 1;
    // const newCurrentIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;

    const newCurrentIndex = Math.random();

    oldIndex.current = currentIndex;
    state.updateCurrentIndex(newCurrentIndex);
  }

  return (
    <Styles.MainWrapper onClick={handleClick}>
      <CSSTransitionGroup
        component={React.Fragment}
        transitionName={slideInFromRight ? 'slide-in-right' : 'slide-in-left'}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppearTimeout={100}
        transitionLeave
        transitionAppear
      >
        <Slide title={title} text={text} key={title} />
      </CSSTransitionGroup>
    </Styles.MainWrapper>
  );
};

const { number, func, node } = PropTypes;

MainContent.propTypes = {
  currentIndex: number.isRequired,
  oldIndex: number.isRequired,
  children: node.isRequired,
  handleClick: func.isRequired,
};

export { MainContent };
