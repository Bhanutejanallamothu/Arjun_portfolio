import { createRoot } from 'react-dom/client';
import Beams from './Beams';

const beamsRoot = document.getElementById('beams-root');

if (beamsRoot) {
  createRoot(beamsRoot).render(
    <Beams
      beamWidth={3}
      beamHeight={30}
      beamNumber={50}
      lightColor="#ffffff"
      speed={2.7}
      noiseIntensity={1.75}
      scale={0.27}
      rotation={360}
    />
  );
}
