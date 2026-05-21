import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./orbiting-skills.css";

type IconType =
  | "cinematography"
  | "editing"
  | "color"
  | "design"
  | "content"
  | "vfx";
type GlowColor = "cyan" | "purple";

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

const iconComponents: Record<
  IconType,
  { component: () => React.JSX.Element; color: string }
> = {
  cinematography: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-skill-svg">
        <rect x="4" y="8" width="13" height="10" rx="2.5" fill="#22D3EE" />
        <circle cx="10.5" cy="13" r="3.2" fill="#0F172A" stroke="#E0FBFF" strokeWidth="1.4" />
        <circle cx="10.5" cy="13" r="1.2" fill="#E0FBFF" />
        <path d="M17 10.5 20.5 8.8v8.4L17 15.5Z" fill="#67E8F9" />
        <path
          d="M6.5 8 8 5.5h3L9.6 8M11 8l1.6-3h3L14 8"
          stroke="#A5F3FC"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "#22D3EE",
  },
  editing: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-skill-svg">
        <rect x="4" y="6" width="16" height="12" rx="2.5" fill="#F59E0B" opacity="0.18" />
        <rect x="4" y="6" width="16" height="12" rx="2.5" stroke="#FBBF24" strokeWidth="1.4" />
        <path d="M7.5 9.5h7M7.5 12h4M7.5 14.5h6.5" stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M15.8 15.8 19 12.6m0 0 1.4-1.4a1.2 1.2 0 0 0 0-1.7l-.9-.9a1.2 1.2 0 0 0-1.7 0l-1.4 1.4m2.6 2.6-2.6-2.6"
          stroke="#FBBF24"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.2 17.2 14.8 20l2.8-.4"
          stroke="#FDE68A"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "#F59E0B",
  },
  color: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-skill-svg">
        <circle cx="12" cy="12" r="7.2" fill="#1F2937" stroke="#C084FC" strokeWidth="1.4" />
        <path d="M12 4.8A7.2 7.2 0 0 1 19.2 12H12Z" fill="#22D3EE" />
        <path d="M19.2 12A7.2 7.2 0 0 1 12 19.2V12Z" fill="#F59E0B" />
        <path d="M12 19.2A7.2 7.2 0 0 1 4.8 12H12Z" fill="#EC4899" />
        <circle cx="15.8" cy="8.2" r="1.4" fill="#F8FAFC" />
        <path
          d="M9.2 14.8c0 1.1-.9 2-2 2"
          stroke="#F8FAFC"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    color: "#C084FC",
  },
  design: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-skill-svg">
        <path
          d="M6.5 17.5 17.4 6.6a2.1 2.1 0 0 1 3 3L9.5 20.5l-4 .9Z"
          fill="#F472B6"
          opacity="0.2"
        />
        <path
          d="M6.5 17.5 17.4 6.6a2.1 2.1 0 0 1 3 3L9.5 20.5l-4 .9Z"
          stroke="#F472B6"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M15.9 8.1 18.9 11.1" stroke="#FBCFE8" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="5.7" cy="18.3" r="1.2" fill="#FBCFE8" />
      </svg>
    ),
    color: "#F472B6",
  },
  content: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-skill-svg">
        <rect x="5" y="6" width="14" height="12" rx="3" fill="#10B981" opacity="0.18" />
        <rect x="5" y="6" width="14" height="12" rx="3" stroke="#34D399" strokeWidth="1.4" />
        <path d="m10 10 5 2-5 2Z" fill="#A7F3D0" />
        <path
          d="M8 4.7v2.1M12 3.8v3M16 4.7v2.1"
          stroke="#A7F3D0"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    color: "#10B981",
  },
  vfx: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-skill-svg">
        <path
          d="M7 8.5 12 5l5 3.5v7L12 19l-5-3.5Z"
          fill="#8B5CF6"
          opacity="0.18"
        />
        <path
          d="M7 8.5 12 5l5 3.5v7L12 19l-5-3.5Z"
          stroke="#A78BFA"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="m12 7.8 1 2 2.2.3-1.6 1.6.4 2.3-2-1-2 1 .4-2.3-1.6-1.6 2.2-.3Z"
          fill="#F5F3FF"
        />
      </svg>
    ),
    color: "#8B5CF6",
  },
};

const skillsConfig: SkillConfig[] = [
  {
    id: "cinematography",
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: "cinematography",
    phaseShift: 0,
    glowColor: "cyan",
    label: "Cinematography",
  },
  {
    id: "editing",
    orbitRadius: 100,
    size: 45,
    speed: 1,
    iconType: "editing",
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "cyan",
    label: "Video Editing",
  },
  {
    id: "color-grading",
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: "color",
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "cyan",
    label: "Color Grading",
  },
  {
    id: "graphic-design",
    orbitRadius: 180,
    size: 50,
    speed: -0.6,
    iconType: "design",
    phaseShift: 0,
    glowColor: "purple",
    label: "Graphic Design",
  },
  {
    id: "content-creation",
    orbitRadius: 180,
    size: 45,
    speed: -0.6,
    iconType: "content",
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "purple",
    label: "Content Creation",
  },
  {
    id: "vfx",
    orbitRadius: 180,
    size: 40,
    speed: -0.6,
    iconType: "vfx",
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "purple",
    label: "Visual Effects",
  },
];

const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});

SkillIcon.displayName = "SkillIcon";

const OrbitingSkill = memo(
  ({
    config,
    iconRef,
  }: {
    config: SkillConfig;
    iconRef: (element: HTMLDivElement | null) => void;
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { size, iconType, label, glowColor, orbitRadius, phaseShift } = config;
    const glowClass =
      glowColor === "cyan"
        ? "orbit-skill-button--cyan"
        : "orbit-skill-button--purple";
    const initialX = Math.cos(phaseShift) * orbitRadius;
    const initialY = Math.sin(phaseShift) * orbitRadius;

    return (
      <div
        ref={iconRef}
        className="orbit-skill-anchor"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(calc(${initialX}px - 50%), calc(${initialY}px - 50%))`,
        }}
      >
        <div
          className={`orbit-skill-button ${glowClass} ${isHovered ? "is-hovered" : ""}`}
          style={
            {
              "--orbit-icon-glow": `${iconComponents[iconType]?.color}55`,
              "--orbit-icon-glow-soft": `${iconComponents[iconType]?.color}22`,
            } as React.CSSProperties
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <SkillIcon type={iconType} />
          <div className={`orbit-skill-tooltip ${isHovered ? "is-visible" : ""}`}>
            {label}
          </div>
        </div>
      </div>
    );
  }
);

OrbitingSkill.displayName = "OrbitingSkill";

const GlowingOrbitPath = memo(
  ({
    radius,
    glowColor = "cyan",
    animationDelay = 0,
  }: {
    radius: number;
    glowColor?: GlowColor;
    animationDelay?: number;
  }) => {
    const glowColors = {
      cyan: {
        primary: "rgba(6, 182, 212, 0.32)",
        secondary: "rgba(6, 182, 212, 0.14)",
        border: "rgba(6, 182, 212, 0.25)",
      },
      purple: {
        primary: "rgba(147, 51, 234, 0.28)",
        secondary: "rgba(147, 51, 234, 0.12)",
        border: "rgba(147, 51, 234, 0.22)",
      },
    };

    const colors = glowColors[glowColor];

    return (
      <div
        className="orbit-path"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          animationDelay: `${animationDelay}s`,
        }}
      >
        <div
          className="orbit-path-glow"
          style={
            {
              "--orbit-path-primary": colors.primary,
              "--orbit-path-secondary": colors.secondary,
            } as React.CSSProperties
          }
        />
        <div
          className="orbit-path-ring"
          style={
            {
              "--orbit-path-border": colors.border,
              "--orbit-path-secondary": colors.secondary,
            } as React.CSSProperties
          }
        />
      </div>
    );
  }
);

GlowingOrbitPath.displayName = "GlowingOrbitPath";

function OrbitingSkills() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    let animationFrameId = 0;
    let lastTime = performance.now();
    let elapsedTime = 0;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isPausedRef.current) {
        elapsedTime += deltaTime;

        skillsConfig.forEach((config, index) => {
          const element = iconRefs.current[index];
          if (!element) return;

          const angle = elapsedTime * config.speed + config.phaseShift;
          const x = Math.cos(angle) * config.orbitRadius;
          const y = Math.sin(angle) * config.orbitRadius;

          element.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const orbitConfigs = useMemo(
    () => [
      { radius: 100, glowColor: "cyan" as GlowColor, delay: 0 },
      { radius: 180, glowColor: "purple" as GlowColor, delay: 1.5 },
    ],
    []
  );

  return (
    <div className="skills-orbit-shell">
      <div className="skills-orbit-copy">
        <p className="skills-orbit-kicker">Creative Orbit</p>
        <h3 className="skills-orbit-title">The craft behind every frame, cut, grade, and effect.</h3>
        <p className="skills-orbit-text">
          The inner ring focuses on production craft, while the outer orbit expands
          into design, distribution, and post-production polish across the portfolio.
        </p>
      </div>

      <div className="skills-orbit-stage">
        <div
          ref={containerRef}
          className="skills-orbit-viewport"
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
        >
          <div className="skills-orbit-backdrop" />

          <div className="skills-orbit-core">
            <div className="skills-orbit-core-glow skills-orbit-core-glow--cyan" />
            <div className="skills-orbit-core-glow skills-orbit-core-glow--purple" />
            <div className="skills-orbit-core-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#orbit-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#9333EA" />
                  </linearGradient>
                </defs>
                <rect x="4" y="8" width="11" height="8" rx="2"></rect>
                <circle cx="9.5" cy="12" r="2.1"></circle>
                <path d="M15 10.2 19.5 8v8l-4.5-2.2Z"></path>
              </svg>
            </div>
          </div>

          {orbitConfigs.map((config) => (
            <GlowingOrbitPath
              key={`path-${config.radius}`}
              radius={config.radius}
              glowColor={config.glowColor}
              animationDelay={config.delay}
            />
          ))}

          {skillsConfig.map((config, index) => (
            <OrbitingSkill
              key={config.id}
              config={config}
              iconRef={(element) => {
                iconRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("skills-orbit-root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <OrbitingSkills />
    </React.StrictMode>
  );
}
