import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import Slide from './components/Slide';
import UpdateBar from './components/UpdateBar';
import StatusBar from './components/StatusBar';

const AppWrapper = styled.div`
  display: flex;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: hidden;
  flex-direction: column;
  background: black;  
`;

const MainWrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  .example-appear {
    opacity: 0.1;
    // background: red;
  }

  .example-enter {
    opacity: 0.1;
    // background: green;
  }

  .example-appear.example-appear-active {
    opacity: 1;
    // transition: opacity .5s ease-in;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    // transition: opacity .5s ease-in;
  }
`;

class App extends Component {
  render() {
    const { dateLong, dateProsa, boxInformation, isUpdating, showFullNumber } = this.props;

    const dateLongComponent = <Slide text={ dateLong } title="Production date" key={ 1 } />;
    const dateProsaComponent = <Slide text={ dateProsa } title="Age" key={ 2 } />;

    return (
      <AppWrapper onClick={ this.props.handleClickEvent }>
        <UpdateBar isUpdating={ isUpdating } />
        <MainWrapper>
          { !isUpdating && (
            <CSSTransitionGroup
              component={ React.Fragment }
              transitionName="example"
              transitionAppear={ true }
              transitionAppearTimeout={ 500 }
              transitionLeave={ false }
              transitionEnterTimeout={ 500 }
            >
              { showFullNumber ? dateLongComponent : dateProsaComponent }
            </CSSTransitionGroup>
          )}
        </MainWrapper>
        <StatusBar isUpdating={ isUpdating } list={ boxInformation } />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  dateLong: PropTypes.string,
  dateProsa: PropTypes.string,
  boxInformation: PropTypes.object,
  isUpdating: PropTypes.bool,
  showFullNumber: PropTypes.bool,
  handleClickEvent: () => {},
};

export default App;
