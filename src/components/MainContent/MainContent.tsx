import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import { Slide } from '../Slide';
import { BoxDataContext } from '../DataProvider';

import * as Styles from './MainContent.styles';

const MainContent: React.FC<{}> = (): JSX.Element => {
  const state = React.useContext(BoxDataContext);

  const componentsToShow = 'componentsToShow' in state ? state.componentsToShow : [];
  const boxData = 'boxData' in state ? state.boxData : {};
  const currentIndex = 'currentIndex' in state ? state.currentIndex : 0;
  const prevIndex = 'prevIndex' in state ? state.prevIndex : 0;

  const slideInFromRight = currentIndex > prevIndex;
  const title = componentsToShow[currentIndex] || '';
  const text = (boxData as any)[title] || '';

  function handleClick(): void {
    const indexOfLastEntry = componentsToShow.length - 1;
    const newCurrentIndex = currentIndex < indexOfLastEntry ? currentIndex + 1 : 0;

    state.updateCurrentIndex(newCurrentIndex);
  }

  return (
    <Styles.MainWrapper onClick={handleClick}>
      <TransitionGroup
        component={React.Fragment}
        transitionName={slideInFromRight ? 'slide-in-right' : 'slide-in-left'}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppearTimeout={100}
        transitionLeave
        transitionAppear
      >
        <Slide title={title} text={text} key={title} />
      </TransitionGroup>
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
