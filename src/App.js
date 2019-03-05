import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import Slide from './components/Slide';
import UpdateBar from './components/UpdateBar';
import StatusBar from './components/StatusBar';
import MainContent from './components/MainContent';

const AppWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  justify-content: stretch;
  align-self: stretch;
  background: black;
`;

const App = (props) => {
  const { boxData, isUpdating, currentIndex, handleClickEvent, handleTransitionEnd } = props;
  const currentSlide = Object.keys(boxData)[currentIndex];

  return (
    <AppWrapper onClick={ handleClickEvent } onTransitionEnd={ handleTransitionEnd }>
      <UpdateBar isUpdating={ isUpdating } />
      <MainContent isUpdating={ isUpdating }>
        <Slide title={ currentSlide } text={ boxData[currentSlide] } key={ currentSlide } />
      </MainContent>
      <StatusBar isUpdating={ isUpdating } list={ boxData } />
    </AppWrapper>
  );
};

App.propTypes = {
  boxData: PropTypes.object,
  isUpdating: PropTypes.bool,
  showFullNumber: PropTypes.bool,
  currentIndex: PropTypes.number,
  handleClickEvent: () => {},
  handleTransitionEnd: () => {},
};

export default App;
