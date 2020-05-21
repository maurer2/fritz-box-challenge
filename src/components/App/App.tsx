import PropTypes from 'prop-types';
import React, { useRef, useState, useContext } from 'react';
import { Normalize } from 'styled-normalize';

import { MainContent } from '../MainContent';
import { NavBar } from '../NavBar';
import { Theme } from '../Theme';
import { UpdateBar } from '../UpdateBar';
import { DataProvider, BoxDataContext } from '../DataProvider';

import * as Types from './App.types';
import * as Styles from './App.styles';

const App: React.FC = (): JSX.Element => {
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

  return (
    <DataProvider>
      <Theme>
        <Normalize />
        <Styles.AppWrapper>
          <UpdateBar />
          <MainContent />
          <NavBar />
        </Styles.AppWrapper>
      </Theme>
    </DataProvider>
  );
};

export { App };
