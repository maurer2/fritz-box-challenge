import React from 'react';
import styled from 'styled-components/macro';
// import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import Slide from './components/Slide';
import UpdateBar from './components/UpdateBar';
import StatusBar from './components/StatusBar';
import MainContent from './components/MainContent';

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

const App = (props) => {
  const { boxInformation, isUpdating, componentsToShow, currentComponentIndex } = props;
  const { handleClickEvent, handleTransitionEnd } = props;

  return (
    <AppWrapper onClick={ handleClickEvent } onTransitionEnd={ handleTransitionEnd }>
      <UpdateBar isUpdating={ isUpdating } />
      <MainContent isUpdating={ isUpdating }>
        {componentsToShow.map((entry, index) => (index === currentComponentIndex) &&
          <Slide title={ entry } text={ boxInformation[entry] } key={ index } />)
        }
      </MainContent>
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
  handleTransitionEnd: () => {},
};

export default App;
