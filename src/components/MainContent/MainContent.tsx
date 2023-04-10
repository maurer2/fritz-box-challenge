import React, { FC } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Slide } from '../Slide';
import { BoxDataContext } from '../DataProvider';

import * as Styles from './MainContent.styles';
import * as Types from './MainContent.types';

const MainContent: FC<Types.MainContentProps> = (): JSX.Element => {
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
