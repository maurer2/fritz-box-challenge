import React, { useContext } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; // todo replace with https://github.com/szhsin/react-transition-state

import { Slide } from '../Slide';
import { BoxDataContext } from '../DataProvider';

import * as Styles from './MainContent.styles';

const MainContent = () => {
  const state = useContext(BoxDataContext);

  const {
    visibleComponents,
    boxData,
    currentIndex,
    prevIndex,
    updateCurrentIndex,
  } = state;

  if (!boxData) {
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
    <Styles.MainWrapper onClick={(): void => handleClick()}>
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
