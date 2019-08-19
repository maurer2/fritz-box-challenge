import React, { useState, useEffect } from 'react';
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
  background: #080808;
`;

const App = ({ boxData, isUpdating, isValid, componentsToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [oldIndex, setOldIndex] = useState(0);
  const [slideInFromRight, setSlideInFromRight] = useState(true);

  useEffect(() => {
    const newSlideInFromRight = (oldIndex <= currentIndex);

    setSlideInFromRight(newSlideInFromRight);
  }, [currentIndex, oldIndex, slideInFromRight]);

  const title = componentsToShow[currentIndex] || '';
  const text = boxData[title] || '';

  function handleClick() {
    const lastIndex = componentsToShow.length - 1;
    const newCurrentIndex = (currentIndex < lastIndex) ? currentIndex + 1 : 0;

    setOldIndex(currentIndex);
    setCurrentIndex(newCurrentIndex);
  }

  function handleNavigation(index) {
    setOldIndex(currentIndex);
    setCurrentIndex(index);
  }

  return (
    <AppWrapper>
      <UpdateBar isUpdating={ isUpdating } isValid={ isValid } />
      { !isUpdating && !!isValid && (
        <>
          <MainContent handleClick={ handleClick } slideInFromRight={ slideInFromRight }>
            <Slide title={ title } text={ text } key={ title } />
          </MainContent>
          <NavBar
            componentsToShow={ componentsToShow }
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
  componentsToShow: PropTypes.arrayOf(PropTypes.string),
};

export default App;
