import React, { useRef } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import { Slide } from '../Slide';
import { BoxDataContext } from '../DataProvider';

import * as Styles from './MainContent.styles';

const MainContent: React.FC<{}> = (): JSX.Element => {
  const state = React.useContext(BoxDataContext);
  const oldIndex = useRef(0 as number);

  const componentsToShow = 'componentsToShow' in state ? state.componentsToShow : [];
  const boxData = 'boxData' in state ? state.boxData : {};
  const currentIndex = 'currentIndex' in state ? state.currentIndex : 0;

  const slideInFromRight = currentIndex > oldIndex.current;
  const title = componentsToShow[currentIndex] || '';
  const text = (boxData as any)[title] || '';

  function handleClick(): void {
    const indexOfLastEntry = componentsToShow.length - 1;
    const newCurrentIndex = currentIndex < indexOfLastEntry ? currentIndex + 1 : 0;

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
