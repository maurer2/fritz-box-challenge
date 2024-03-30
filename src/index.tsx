import React, { StrictMode, lazy } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/order
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import 'modern-normalize';

import './index.css';
import { App } from './components/App';

const isDevMode = import.meta.env.VITE_APP_MODE === 'dev';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('root element is missing');
}
const root = ReactDOM.createRoot(rootElement);

// fetch from public folder
const mockDataResponse = await fetch('/mock-data.txt');
const mockData = await mockDataResponse.text();

const worker = setupWorker(...[
  http.all('http://fritz.box/cgi-bin/system_status', () => HttpResponse.text(
    mockData,
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
      refetchOnMount: false,
      refetchOnReconnect: false,
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
