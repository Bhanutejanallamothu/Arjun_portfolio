import React from 'react';
import { createRoot } from 'react-dom/client';
import Shuffle from '../components/ui/Shuffle';

const mount = () => {
  const heroTitleRoot = document.getElementById('hero-title-root');
  if (!heroTitleRoot) return;
  const root = createRoot(heroTitleRoot);
  root.render(
    <React.StrictMode>
      <Shuffle
        text="ARJUN VASUDEV"
        shuffleDirection="right"
        duration={0.8}
        animationMode="evenodd"
        shuffleTimes={1}
        ease="power2.out"
        stagger={0.04}
        threshold={0.1}
        triggerOnce={true}
        triggerOnHover={true}
        respectReducedMotion={true}
        loop={false}
        tag="h1"
      />
    </React.StrictMode>
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
