import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import { PropTypes } from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 2.5rem;
  text-align: center;
  font-size: 2.5rem;
  background: red;
`;

const FadeTransition = styled.div`
  .fade-appear,
  .fade-enter {
    opacity: 0.01;
  }

  .fade-appear.fade-appear-active,
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
    }

  .fade-leave {
    opacity: 1;
  }

  .fade-leave.fade-leave-active {
    opacity: 0.01;
    transition: opacity 500ms ease-in;
  }
`;

class TimerComponent extends PureComponent {
  render() {
    return (
      <FadeTransition>
        <CSSTransitionGroup
          component={ React.Fragment }
          transitionAppear={ true }
          transitionName="fade"
          transitionAppearTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
          transitionEnterTimeout={ 0 }
        >
        { this.props.isUpdating && (
          <TimerWrapper>
            Updating!
          </TimerWrapper>
        )}
        </CSSTransitionGroup>
      </FadeTransition>
    );
  }
}

TimerComponent.propTypes = {
  isUpdating: PropTypes.bool,
};

export default TimerComponent;
