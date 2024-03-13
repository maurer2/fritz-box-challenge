import React, { StrictMode, lazy } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/order
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'modern-normalize';

import './index.css';

import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

import { App } from './components/App';

const isDevMode = import.meta.env.VITE_APP_MODE === 'dev';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('root element is missing');
}
const root = ReactDOM.createRoot(rootElement);

const worker = setupWorker(...[
  http.all('http://fritz.box/cgi-bin/system_status', () => HttpResponse.text(
    '<html><body>FRITZ!Box 7590-B-030601-050110-XXXXXX-XXXXXX-787902-1540750-101716-1und1</body></html>',
    {
      status: 202,
      statusText: 'Mocked status',
    },
  ))]);

const ReactQueryDevtools = isDevMode ? lazy(() => import('@tanstack/react-query-devtools').then(
  (module) => ({
    default: module.ReactQueryDevtools,
  }),
)) : null;

if (isDevMode) {
  await worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {ReactQueryDevtools !== null && <ReactQueryDevtools initialIsOpen />}
    </QueryClientProvider>
  </StrictMode>,
);
