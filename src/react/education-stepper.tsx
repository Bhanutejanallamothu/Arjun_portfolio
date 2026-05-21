import React from "react";
import { createRoot } from "react-dom/client";
import BorderGlow from "../components/ui/BorderGlow";
import Stepper, { Step } from "../components/ui/Stepper";

function EducationStepper() {
  return (
    <Stepper
      className="education-stepper"
      initialStep={1}
      backButtonText="Previous"
      nextButtonText="Next"
      completeButtonText="Current Focus"
      completedText="In Progress"
      onFinalStepCompleted={() => {}}
    >
      <Step>
        <BorderGlow
          className="education-border-glow"
          edgeSensitivity={26}
          glowColor="40 80 80"
          backgroundColor="#0d1117"
          borderRadius={24}
          glowRadius={34}
          glowIntensity={1}
          coneSpread={24}
          animated={true}
          colors={["#e8a020", "#f7c15c", "#56d5ff"]}
          fillOpacity={0.38}
        >
          <article className="education-step-card">
            <div className="education-step-grid">
              <div>
                <div className="education-step-pill">2022 - 2023</div>
                <p className="education-step-kicker">Foundation Stage</p>
                <h3 className="education-step-heading">MCP</h3>
                <h4 className="education-step-subheading">Andhra Loyola</h4>
                <p className="education-step-copy">
                  Foundational studies that built a strong technical and creative base
                  before moving deeper into animation, visual storytelling, and media
                  production.
                </p>
              </div>
              <div className="education-step-meta">
                <div className="education-step-meta-item">
                  <span className="education-step-meta-label">Focus</span>
                  <span className="education-step-meta-value">
                    Core academics and creative discipline
                  </span>
                </div>
                <div className="education-step-meta-item">
                  <span className="education-step-meta-label">Outcome</span>
                  <span className="education-step-meta-value">
                    Strong base for film, editing, and design work
                  </span>
                </div>
              </div>
            </div>
          </article>
        </BorderGlow>
      </Step>

      <Step>
        <BorderGlow
          className="education-border-glow"
          edgeSensitivity={26}
          glowColor="40 80 80"
          backgroundColor="#0d1117"
          borderRadius={24}
          glowRadius={34}
          glowIntensity={1}
          coneSpread={24}
          animated={true}
          colors={["#e8a020", "#f7c15c", "#56d5ff"]}
          fillOpacity={0.38}
        >
          <article className="education-step-card">
            <div className="education-step-grid">
              <div>
                <div className="education-step-pill">2024 - 2027</div>
                <p className="education-step-kicker">Degree Program</p>
                <h3 className="education-step-heading">BSc Animation &amp; Gaming</h3>
                <h4 className="education-step-subheading">KL University</h4>
                <p className="education-step-copy">
                  Current academic track centered on advanced VFX, 3D animation, and
                  interactive media design, connecting technical execution with cinematic
                  storytelling.
                </p>
              </div>
              <div className="education-step-meta">
                <div className="education-step-meta-item">
                  <span className="education-step-meta-label">Specialization</span>
                  <span className="education-step-meta-value">
                    VFX pipelines, animation, and interactive media
                  </span>
                </div>
                <div className="education-step-meta-item">
                  <span className="education-step-meta-label">Status</span>
                  <span className="education-step-meta-value">
                    Ongoing degree journey with hands-on creative production
                  </span>
                </div>
              </div>
            </div>
          </article>
        </BorderGlow>
      </Step>

      <Step>
        <BorderGlow
          className="education-border-glow"
          edgeSensitivity={26}
          glowColor="40 80 80"
          backgroundColor="#0d1117"
          borderRadius={24}
          glowRadius={34}
          glowIntensity={1}
          coneSpread={24}
          animated={true}
          colors={["#e8a020", "#f7c15c", "#56d5ff"]}
          fillOpacity={0.38}
        >
          <article className="education-step-card">
            <div className="education-step-grid">
              <div>
                <div className="education-step-tag">Current Direction</div>
                <h3 className="education-step-heading">Blending Film With VFX</h3>
                <h4 className="education-step-subheading">Where the journey is heading</h4>
                <p className="education-step-copy">
                  The current focus is on combining cinematography instincts with post
                  production craft, especially visual effects, color, motion design, and
                  immersive media workflows.
                </p>
              </div>
              <div className="education-step-meta">
                <div className="education-step-meta-item">
                  <span className="education-step-meta-label">Creative Goal</span>
                  <span className="education-step-meta-value">
                    Build cinematic experiences with strong visual polish
                  </span>
                </div>
                <div className="education-step-meta-item">
                  <span className="education-step-meta-label">Next Evolution</span>
                  <span className="education-step-meta-value">
                    More advanced VFX work, 3D pipelines, and interactive storytelling
                  </span>
                </div>
              </div>
            </div>
          </article>
        </BorderGlow>
      </Step>
    </Stepper>
  );
}

const rootElement = document.getElementById("education-stepper-root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <EducationStepper />
    </React.StrictMode>
  );
}
