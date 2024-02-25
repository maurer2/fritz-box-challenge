// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'modern-normalize';

import { App } from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
