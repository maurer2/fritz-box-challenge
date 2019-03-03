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
  display: block;

  .fade-appear {
    opacity: 0.1;
    background: red;
  }

  .fade-enter {
    opacity: 0.1;
    background: green;
  }

  .fade-appear.fade-appear-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
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
            transitionAppear={ true }
            transitionAppearTimeout={ 500 }
            transitionLeave={ false }
            transitionEnterTimeout={ 500 }
          >
            {componentsToShow.map((entry, index) => (index === currentComponentIndex) &&
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
