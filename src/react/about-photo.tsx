import { createRoot } from 'react-dom/client';
import DecayCard from './DecayCard';

const aboutRoot = document.getElementById('about-photo-root');

if (aboutRoot) {
  createRoot(aboutRoot).render(
    <DecayCard width={320} height={420} image="/main_img.jpeg" movementBound={35} maxDisplacement={280}>
      <h2>Arjun<br />Vasudev</h2>
    </DecayCard>
  );
}
