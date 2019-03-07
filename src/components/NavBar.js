import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import NavBarEntry from './NavBarEntry';

const BoxInformationWrapper = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  flex-wrap: wrap;
  background: red;
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

const BoxInformationComponent = (props) => {
  const { boxData, isUpdating, handleClickEvent, currentIndex } = props;

  return (
    <SlideYTransition onClick={ handleClickEvent }>
      <CSSTransitionGroup
        component={ React.Fragment }
        transitionAppear={ false }
        transitionName="slide"
        transitionAppearTimeout={ 0 }
        transitionLeaveTimeout={ 250 }
        transitionEnterTimeout={ 250 }
      >
        { !isUpdating && (
          <BoxInformationWrapper>
            { Object.keys(boxData).map((entry, index) => (
              <NavBarEntry entry={ entry } key={ index } isActive={ currentIndex === index }/>
            ))}
          </BoxInformationWrapper>
        )}
      </CSSTransitionGroup>
    </SlideYTransition>
  );
};

BoxInformationComponent.propTypes = {
  boxData: PropTypes.object,
  isUpdating: PropTypes.bool,
  handleClickEvent: PropTypes.func,
  currentIndex: PropTypes.number,
};

export default BoxInformationComponent;
