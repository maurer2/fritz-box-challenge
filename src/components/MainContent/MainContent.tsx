import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; // todo replace with https://github.com/szhsin/react-transition-state

import useBoxDataContext from '../../hooks/useBoxDataContext/useBoxDataContext';
import { Slide } from '../Slide';

import * as Styles from './MainContent.styles';

const MainContent = () => {
  const {
    _state,
    visibleComponents,
    boxData,
    currentIndex,
    prevIndex,
    updateCurrentIndex,
  } = useBoxDataContext();

  if (_state !== 'success') {
    return null;
  }

  const title = visibleComponents[currentIndex];
  const text = boxData?.[title];
  const slideInFromRight = currentIndex > prevIndex;

  function handleClick(): void {
    const indexOfLastEntry = visibleComponents.length - 1;
    const newCurrentIndex = currentIndex < indexOfLastEntry ? currentIndex + 1 : 0;

    updateCurrentIndex(newCurrentIndex);
  }

  return (
    <Styles.MainWrapper onClick={() => handleClick()}>
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

export { MainContent };
