import React from 'react';
import { createRoot } from 'react-dom/client';
import CameraIntro from '../components/ui/camera-intro';

const rootElement = document.getElementById('intro-root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <CameraIntro />
    </React.StrictMode>
  );
}
