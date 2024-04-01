import React, { Fragment } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; // todo replace with https://github.com/szhsin/react-transition-state
import { useTransition } from 'react-transition-state';

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
  const [{ status }, toggle] = useTransition({
    timeout: 500,
    mountOnEnter: true,
    unmountOnExit: true,
    preEnter: true,
  });

  if (_state !== 'success') {
    return null;
  }

  const title = visibleComponents[currentIndex];
  const text = boxData?.[title];
  // const slideInFromRight = currentIndex > prevIndex;

  function handleClick(): void {
    const indexOfLastEntry = visibleComponents.length - 1;
    const newCurrentIndex = currentIndex < indexOfLastEntry ? currentIndex + 1 : 0;

    updateCurrentIndex(newCurrentIndex);
    toggle();
  }

  return (
    <Styles.MainWrapper>
      <Styles.MainWrapperSlideWrapper $status={status}>
        <Slide title={title} text={text} key={title} />
      </Styles.MainWrapperSlideWrapper>
      <Styles.MainWrapperTrigger onClick={() => handleClick()}>
        <span className="text">
          Next slide
        </span>
      </Styles.MainWrapperTrigger>
    </Styles.MainWrapper>
  );
};

export { MainContent };
