import React, { FC } from 'react';
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

import { DataProvider } from './DataProvider';
import { UpdateBar } from './UpdateBar';
import { Theme } from './Theme';
import { NavBar } from './NavBar';
import { MainContent } from './MainContent';
import * as Styles from './App.styles';

const worker = setupWorker(...[
  http.all('http://fritz.box/cgi-bin/system_status', () => HttpResponse.text(
    '<html><body>FRITZ!Box 7590 (UI)-B-030601-050110-XXXXXX-XXXXXX-787902-1540750-101716-1und1</body></html>',
    {
      status: 202,
      statusText: 'Mocked status',
    },
  ))]);

await worker.start();

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
