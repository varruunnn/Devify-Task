import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ChapterProvider } from './context/ChapterContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ChapterProvider>
      <App />
    </ChapterProvider>
  </React.StrictMode>
);