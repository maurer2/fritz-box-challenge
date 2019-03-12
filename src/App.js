import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import Slide from './components/Slide';
import UpdateBar from './components/UpdateBar';
import NavBar from './components/NavBar';
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
  const { boxData, isUpdating, currentIndex, handleNavigation, handleClickEvent, isValid } = props;
  const currentSlide = Object.keys(boxData)[currentIndex];

  return (
    <AppWrapper>
      <UpdateBar isUpdating={ isUpdating } isValid={ isValid } />
      { !isUpdating && !!isValid && (
        <>
          <MainContent handleClickEvent={ handleClickEvent }>
            <Slide title={ currentSlide } text={ boxData[currentSlide] } key={ currentSlide } />
          </MainContent>
          <NavBar
            boxData={ boxData }
            currentIndex={ currentIndex }
            handleNavigation={ handleNavigation }
          />
        </>
      )}
    </AppWrapper>
  );
};

App.propTypes = {
  boxData: PropTypes.object,
  isUpdating: PropTypes.bool,
  isValid: PropTypes.bool,
  showFullNumber: PropTypes.bool,
  currentIndex: PropTypes.number,
  handleClickEvent: () => {},
  handleNavigation: () => {},
};

export default App;
