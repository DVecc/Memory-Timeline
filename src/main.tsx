// main.tsx or App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import MemoryTimelineApp from './MemoryTimelineApp'; // adjust path if needed

import './index.css'; // Tailwind CSS import (make sure Tailwind is set up)

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <MemoryTimelineApp />
  </React.StrictMode>,
);