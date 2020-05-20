import PropTypes from 'prop-types';
import React, { useRef, useState, useContext } from 'react';
import { Normalize } from 'styled-normalize';

import { MainContent } from '../MainContent';
import { NavBar } from '../NavBar';
import { Slide } from '../Slide';
import { Theme } from '../Theme';
import { UpdateBar } from '../UpdateBar';
import { DataProvider, BoxDataContext } from '../DataProvider';

import * as Types from './App.types';
import * as Styles from './App.styles';

const App: React.FC = (): JSX.Element => {
  const boxData = {};
  const isUpdating = true;
  const isValid = true;

  const showContent = false;

  return (
    <DataProvider>
      <Theme>
        <Normalize />
        <Styles.AppWrapper>
          <UpdateBar isUpdating={isUpdating} isValid={isValid} />
        </Styles.AppWrapper>
      </Theme>
    </DataProvider>
  );
};

export { App };
