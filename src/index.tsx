import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'modern-normalize';

import './index.css';

import { App } from './components/App';
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

const isDevMode = import.meta.env.VITE_APP_MODE === 'dev';

const root = ReactDOM.createRoot(document.getElementById('root'));

const worker = setupWorker(...[
  http.all('http://fritz.box/cgi-bin/system_status', () => HttpResponse.text(
    '<html><body>FRITZ!Box 7590-B-030601-050110-XXXXXX-XXXXXX-787902-1540750-101716-1und1</body></html>',
    {
      status: 202,
      statusText: 'Mocked status',
    },
  ))]);
isDevMode && await worker.start();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {isDevMode ? (
        <ReactQueryDevtools initialIsOpen />
      ) : null}
    </QueryClientProvider>
  </React.StrictMode>,
);
