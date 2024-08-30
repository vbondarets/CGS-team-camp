import React from 'react';
import { createRoot } from 'react-dom/client';
import AppContainer from './modules/app';

const element = document.getElementById('root');
const root = createRoot(element!);
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
