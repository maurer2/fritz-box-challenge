import React from 'react';

import { DataProvider } from './DataProvider';
import { UpdateBar } from './UpdateBar';
import { Theme } from './Theme';
import { NavBar } from './NavBar';
import { MainContent } from './MainContent';
import * as Styles from './App.styles';

const App = () => (
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
