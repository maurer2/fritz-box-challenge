import React from 'react';
import styled from 'styled-components/macro';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import Slide from './components/Slide';
import UpdateBar from './components/UpdateBar';
import StatusBar from './components/StatusBar';

const AppWrapper = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: black;
`;

const MainWrapper = styled.main`
  position: relative;
  display: block;
  width: 100%;

  .fade-leave {
    position: relative;
    transition: transform 500ms ease-out;
    transform: translateX(0);
    background: red;

    &.fade-leave-active {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      transform: translateX(-100%);
    }
  }

  .fade-enter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateX(100%);
    background: green;
    transition: transform 500ms ease-in;

    &.fade-enter-active {
      position: relative;
      transform: translateX(0);
    }
  }
`;

const App = (props) => {
  const { boxInformation, isUpdating, componentsToShow, currentComponentIndex, handleClickEvent } = props;
  // const slideComponent = (title, text, index) => <Slide title={ title } text={ text } key={ index }/>;

  return (
    <AppWrapper onClick={ handleClickEvent }>
      <UpdateBar isUpdating={ isUpdating } />
      <MainWrapper>
        { !isUpdating && (
          <CSSTransitionGroup
            component={ React.Fragment }
            transitionName="fade"
            transitionEnterTimeout={ 5000 }
            transitionLeaveTimeout={ 5000 }
            transitionLeave={ true }
          >
            {componentsToShow.map((entry, index) => (index === currentComponentIndex) &&
              // slideComponent(entry, boxInformation[entry], index) )
              <Slide title={ entry } text={ boxInformation[entry] } key={ index } />)
            }
          </CSSTransitionGroup>
        )}
      </MainWrapper>
      <StatusBar isUpdating={ isUpdating } list={ boxInformation } />
    </AppWrapper>
  );
};

App.propTypes = {
  boxInformation: PropTypes.object,
  isUpdating: PropTypes.bool,
  showFullNumber: PropTypes.bool,
  componentsToShow: PropTypes.array,
  currentComponentIndex: PropTypes.number,
  handleClickEvent: () => {},
};

export default App;
