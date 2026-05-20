import React from 'react';
import { createRoot } from 'react-dom/client';
import BubbleMenu from '../components/ui/bubble-menu';

const items = [
  { label: 'about', href: '#about', ariaLabel: 'About', rotation: -8, hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
  { label: 'skills', href: '#skills', ariaLabel: 'Skills', rotation: 8, hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' } },
  { label: 'work', href: '#work', ariaLabel: 'Work', rotation: -8, hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } },
  { label: 'showreel', href: '#showreel', ariaLabel: 'Showreel', rotation: 8, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
  { label: 'contact', href: '#contact', ariaLabel: 'Contact', rotation: -8, hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' } }
];

const container = document.getElementById('navbar-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <BubbleMenu
      logo={<span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#111' }}>AV</span>}
      items={items}
      menuAriaLabel="Toggle navigation"
      menuBg="#ffffff"
      menuContentColor="#111111"
      useFixedPosition={true}
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.12}
    />
  );
}
