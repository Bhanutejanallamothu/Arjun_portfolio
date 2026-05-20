import React, { useEffect, useState } from 'react';
import '../../css/camera-intro.scss';

export default function CameraIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Wait for the animation to play out completely (approx 3.5s)
    const timeout = setTimeout(() => {
      setIsVisible(false);
      
      // Wait for the fade out transition (0.5s) to finish before unmounting
      setTimeout(() => setIsRendered(false), 500);
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  if (!isRendered) return null;

  return (
    <div className={`intro-overlay ${isVisible ? '' : 'hidden-intro'}`}>
      <div id="camera" className="camera">
        <div className="camera-body">
          <div className="camera-body-1"></div>
          <div className="camera-body-2"></div>
          <div className="camera-body-3"></div>
          <div className="camera-body-4"></div>
          <div className="camera-body-5"></div>
        </div>

        <div className="lens-group">
          <div className="lens-group-1">
            <div className="lens-1 lens"></div>
            <div className="lens-2 lens"></div>
          </div>

          <div className="lens-group-2">
            <div className="lens-3 lens"></div>
            <div className="lens-4 lens"></div>
          </div>

          <div className="lens-group-3">
            <div className="lens-5 lens"></div>
            <div className="lens-6 lens"></div>
            <div className="lens-7 lens"></div>
            <div className="lens-8 lens"></div>
          </div>

          <div className="lens-group-4 lens-9 lens grey"></div>

          <div className="lens-group-5">
            <div className="lens-10 lens"></div>
            <div className="lens-11 lens"></div>
            <div className="lens-12 lens"></div>
            <div className="lens-13 lens grey"></div>
            <div className="lens-14 lens"></div>
          </div>

          <div className="lens-group-6 lens-15 lens grey"></div>
        </div>
        
        <div className="smoke"></div>
        <div className="smoke-camera-upper"></div>
        <div className="smoke-camera-bottom"></div>
      </div>
    </div>
  );
}
