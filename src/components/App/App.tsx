// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { FC } from 'react';

import { MainContent } from '../MainContent';
import { NavBar } from '../NavBar';
import { Theme } from '../Theme';
import { UpdateBar } from '../UpdateBar';
import { DataProvider } from '../DataProvider';

import * as Styles from './App.styles';

const App: FC<Record<string, never>> = () => (
  <DataProvider>
    <Theme>
      <Styles.AppWrapper>
        <UpdateBar />
        <MainContent />
        <NavBar />
      </Styles.AppWrapper>
    </Theme>
  </DataProvider>
);

export { App };
