import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import { PropTypes } from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 2.5vh 2.5vw;
  text-align: center;
  font-size: 5vw;
  background: red;
`;

const FadeTransition = styled.div`
  .fade-appear,
  .fade-enter {
    transform: translateY(-100%);
  }

  .fade-appear.fade-appear-active,
  .fade-enter.fade-enter-active {
    transform: translateY(0);
    transition: transform 250ms ease-out;
  }

  .fade-leave {
    transform: translateY(0);
  }

  .fade-leave.fade-leave-active {
    transform: translateY(-100%);
    transition: transform 250ms ease-out;
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
          transitionAppearTimeout={ 250 }
          transitionLeaveTimeout={ 250 }
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
