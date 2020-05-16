import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import * as Styles from './MainContent.styles';
import * as Types from './MainContent.types';

const MainContent: React.FC<Types.MainContentProps> = ({ handleClick,
  currentIndex,
  oldIndex,
  children }): JSX.Element => {
  const slideInFromRight = currentIndex > oldIndex;

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
        {children}
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
