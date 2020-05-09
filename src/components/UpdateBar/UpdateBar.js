import React from 'react';
import { PropTypes } from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import * as Styles from './UpdateBar.styles';

const Wrapper = ({ children }) => {
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

const UpdateBar = ({ isUpdating, isValid }) => {
  const showUpdateBar = (isUpdating || !(isValid));

  return (
    <Wrapper>
      { showUpdateBar && (
        <Styles.Text>
          { !!(isUpdating) && <>Updating!</> }
          { !(isValid) && <>Error!</> }
        </Styles.Text>
      )}
    </Wrapper>
  );
};

const { bool, node } = PropTypes;

UpdateBar.propTypes = {
  isUpdating: bool.isRequired,
  isValid: bool.isRequired,
};

Wrapper.propTypes = {
  children: node,
};

export { UpdateBar };
