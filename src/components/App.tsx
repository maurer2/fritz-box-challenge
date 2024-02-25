import React, { FC } from 'react';
import * as dotenv from 'dotenv';

// import { makeServer } from '../mocks/server';

import { DataProvider } from './DataProvider';
import { UpdateBar } from './UpdateBar';
import { Theme } from './Theme';
import { NavBar } from './NavBar';
import { MainContent } from './MainContent';
import * as Styles from './App.styles';

dotenv.config();

// if (import.meta.env.VITE_APP_MODE === 'dev') {
//   const server = makeServer();
//   server.listen();
// }

const { worker } = await import('../mocks/browser');
worker.start();

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
