import React from 'react';
import styled from 'styled-components/macro';
import { PropTypes } from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

const Text = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  background: gray;
`;

const SlideYTransition = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  > .${props => props.transitionName}-appear {
    transform: translateY(-100%);
    transition: transform 500ms ease-out;

    &.${props => props.transitionName}-appear-active {
      transform: translateY(0);
    }
  }

  > .${props => props.transitionName}-leave {
    transform: translateY(0);
    transition: transform 500ms ease-in;

    &.${props => props.transitionName}-leave-active {
      transform: translateY(-100%);
    }
  }
`;

const UpdateView = ({ isUpdating, isValid }) => {
  const transitionName = 'slide-vertically';

  return (
    <SlideYTransition transitionName={ transitionName }>
      <CSSTransitionGroup
        component={ React.Fragment }
        transitionAppear={ true }
        transitionEnter={ false }
        transitionName={ transitionName }
        transitionAppearTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionEnterTimeout={ 0 }
      >
        { (isUpdating || !(isValid)) && (
          <Text>
            { !!(isUpdating) && <>Updating!</> }
            { !(isValid) && <>Error!</> }
          </Text>
        )}
      </CSSTransitionGroup>
    </SlideYTransition>
  );
};

UpdateView.propTypes = {
  isUpdating: PropTypes.bool,
  isValid: PropTypes.bool,
};

export default UpdateView;
