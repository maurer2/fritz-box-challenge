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
  const { dateLong,
    dateProsa,
    boxInformation,
    isUpdating,
    componentsToShow,
    indexOfShownComponent,
    handleClickEvent } = props;

  const dateLongComponent = <Slide text={ dateLong } title="Production date" key={ 1 } />;
  const dateProsaComponent = <Slide text={ dateProsa } title="Age" key={ 2 } />;
  const slideComponent = (title, text, index) => <Slide title={ title } text={ text } key={ index }/>;

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
            {componentsToShow.map((entry, index) => (
              <Slide text={ entry } title="Age" key={ index } />
            ))}
          </CSSTransitionGroup>
        )}
      </MainWrapper>
      <StatusBar isUpdating={ isUpdating } list={ boxInformation } />
    </AppWrapper>
  );
};

App.propTypes = {
  dateLong: PropTypes.string,
  dateProsa: PropTypes.string,
  boxInformation: PropTypes.object,
  isUpdating: PropTypes.bool,
  showFullNumber: PropTypes.bool,
  handleClickEvent: () => {},
};

export default App;
