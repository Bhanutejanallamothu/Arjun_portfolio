import { createRoot } from 'react-dom/client';
import DecayCard from './DecayCard';

const aboutRoot = document.getElementById('about-photo-root');

if (aboutRoot) {
  createRoot(aboutRoot).render(
    <DecayCard width={320} height={420} image="https://picsum.photos/600/750?grayscale" movementBound={35} maxDisplacement={280}>
      <h2>Arjun<br />Vasudev</h2>
    </DecayCard>
  );
}
