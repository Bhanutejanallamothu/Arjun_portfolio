import React from 'react';
import { createRoot } from 'react-dom/client';
import HeroButton from './HeroButton';

const mount = () => {
  const buttonRoot = document.getElementById('hero-button-root');
  if (!buttonRoot) return;
  const root = createRoot(buttonRoot);
  root.render(
    <React.StrictMode>
      <HeroButton />
    </React.StrictMode>
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
