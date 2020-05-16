import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Normalize } from 'styled-normalize';
import { MainContent } from '../MainContent';
import { NavBar } from '../NavBar';
import { Slide } from '../Slide';
import { Theme } from '../Theme';
import { UpdateBar } from '../UpdateBar';
import * as Styles from './App.styles';
import * as Types from './App.types';

const App: React.FC<Types.AppProps> = ({
  boxData,
  isUpdating,
  isValid,
  componentsToShow,
}): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const oldIndex = useRef(0);

  const title = componentsToShow[currentIndex] || '';
  const text = boxData[title] || '';

  function handleClick(): void {
    const lastIndex = componentsToShow.length - 1;
    const newCurrentIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;

    oldIndex.current = currentIndex;
    setCurrentIndex(newCurrentIndex);
  }

  function handleNavigation(index: number): void {
    oldIndex.current = currentIndex;
    setCurrentIndex(index);
  }

  const showContent = !isUpdating && isValid;

  return (
    <Theme>
      <Normalize />
      <Styles.AppWrapper>
        <UpdateBar isUpdating={isUpdating} isValid={isValid} />
        {showContent && (
          <MainContent
            handleClick={handleClick}
            currentIndex={currentIndex}
            oldIndex={oldIndex.current}
          >
            <Slide title={title} text={text} key={title} />
          </MainContent>
        )}
        <NavBar
          componentsToShow={componentsToShow}
          currentIndex={currentIndex}
          handleNavigation={handleNavigation}
          isUpdating={!showContent}
        />
      </Styles.AppWrapper>
    </Theme>
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
