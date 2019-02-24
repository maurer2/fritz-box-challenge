import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import BoxEntryComponent from '../BoxEntryComponent/BoxEntryComponent';

const BoxInformationWrapper = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  flex-wrap: wrap;
  background: red;
`;

const BoxInformationEntry = styled.li`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 0;

  @media (min-width: 480px) {
    flex-basis: 0;
  }
`;

const SlideYTransition = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  .slide-appear,
  .slide-enter {
    transform: translateY(100%);
  }

  .slide-appear.slide-appear-active,
  .slide-enter.slide-enter-active {
    transform: translateY(0);
    transition: transform 250ms ease-out;
  }

  .slide-leave {
    transform: translateY(0);
  }

  .slide-leave.slide-leave-active {
    transform: translateY(100%);
    transition: transform 250ms ease-out;
  }
`;

class BoxInformationComponent extends PureComponent {
  render() {
    const listFields = ['model', 'technology', 'restarts', 'branding'];

    return (
      <SlideYTransition>
        <CSSTransitionGroup
          component={ React.Fragment }
          transitionAppear={ false }
          transitionName="slide"
          transitionAppearTimeout={ 0 }
          transitionLeaveTimeout={ 250 }
          transitionEnterTimeout={ 250 }
        >
          { !this.props.isUpdating && (
            <BoxInformationWrapper>
              { listFields.map((entry, index) => (
                <BoxInformationEntry key={ index }>
                  <BoxEntryComponent entry={ entry } value={ this.props.list[entry] } />
                </BoxInformationEntry>
              ))}
            </BoxInformationWrapper>
          )}
        </CSSTransitionGroup>
      </SlideYTransition>
    );
  }
}

BoxInformationComponent.propTypes = {
  list: PropTypes.object,
  isUpdating: PropTypes.bool,
};

export default BoxInformationComponent;
