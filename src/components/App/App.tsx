import React, { FC } from 'react';
import { Normalize } from 'styled-normalize';

import { MainContent } from '../MainContent';
import { NavBar } from '../NavBar';
import { Theme } from '../Theme';
import { UpdateBar } from '../UpdateBar';
import { DataProvider } from '../DataProvider';

import * as Styles from './App.styles';

const App: FC<{}> = (): JSX.Element => (
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

export { App };
