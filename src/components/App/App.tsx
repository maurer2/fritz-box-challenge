// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { FC } from 'react';
import * as dotenv from 'dotenv';

import { MainContent } from '../MainContent';
import { NavBar } from '../NavBar';
import { Theme } from '../Theme';
import { UpdateBar } from '../UpdateBar';
import { DataProvider } from '../DataProvider';
import { makeServer } from '../../mocks/server';

import * as Styles from './App.styles';

dotenv.config();

// miragejs
if (process.env.REACT_APP_MODE === 'dev') {
  makeServer();
}

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
