import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import { UpdateBar } from '../UpdateBar';
import { MainContent } from '../MainContent';
import { Slide } from '../Slide';
import { NavBar } from '../NavBar';

const AppWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: stretch;
  align-self: stretch;
  background: #080808;
`;

const App = ({ boxData, isUpdating, isValid, componentsToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const oldIndex = useRef(0);

  const title = componentsToShow[currentIndex] || '';
  const text = boxData[title] || '';

  function handleClick() {
    const lastIndex = componentsToShow.length - 1;
    const newCurrentIndex = (currentIndex < lastIndex) ? currentIndex + 1 : 0;

    oldIndex.current = currentIndex;
    setCurrentIndex(newCurrentIndex);
  }

  function handleNavigation(index) {
    oldIndex.current = currentIndex;
    setCurrentIndex(index);
  }

  return (
    <AppWrapper>
      <UpdateBar isUpdating={ isUpdating } isValid={ isValid } />
      { !isUpdating && !!isValid && (
        <>
          <MainContent
            handleClick={ handleClick }
            currentIndex={ currentIndex }
            oldIndex={ oldIndex.current }
          >
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

const { bool, objectOf, string, arrayOf } = PropTypes;

App.propTypes = {
  boxData: objectOf(string).isRequired,
  isUpdating: bool.isRequired,
  isValid: bool.isRequired,
  componentsToShow: arrayOf(string).isRequired,
};

export { App };
