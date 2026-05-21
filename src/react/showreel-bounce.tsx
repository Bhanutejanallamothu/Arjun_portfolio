import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import BounceCards from "../components/ui/BounceCards";
import "./showreel-bounce.css";

type ShowreelItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};

const showreels: ShowreelItem[] = [
  {
    id: "q_zlHEHfSjk",
    title: "Featured Showreel 01",
    subtitle: "Cinematic storytelling",
    description: "A mood-led edit focused on visual pacing, camera rhythm, and cinematic cuts.",
  },
  {
    id: "jJKyHab4mf4",
    title: "Featured Showreel 02",
    subtitle: "Brand and event energy",
    description: "Fast transitions and polished edit timing built for audience retention and motion.",
  },
  {
    id: "8MTlBN_Q7fs",
    title: "Featured Showreel 03",
    subtitle: "Performance and motion",
    description: "A tighter reel with emphasis on framing, presence, and visual momentum.",
  },
  {
    id: "HoCwI6f9esU",
    title: "Featured Showreel 04",
    subtitle: "Color and atmosphere",
    description: "Showcasing tone, grading choices, and a richer cinematic finish across shots.",
  },
  {
    id: "LduZxiA23_4",
    title: "Featured Showreel 05",
    subtitle: "Editing and VFX blend",
    description: "A reel that leans into layered post-production, visual polish, and final delivery.",
  },
];

const transformStyles = [
  "rotate(6deg) translate(-150px)",
  "rotate(3deg) translate(-75px)",
  "rotate(-2deg)",
  "rotate(-4deg) translate(75px)",
  "rotate(-7deg) translate(150px)",
];

function ShowreelBounce() {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeShowreel = showreels[activeIndex];

  const thumbnails = useMemo(
    () => showreels.map((item) => `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`),
    []
  );

  return (
    <div className="showreel-experience">
      <div className="showreel-player-shell">
        <div className="showreel-player-top">
          <div>
            <p className="showreel-kicker">Curated selection</p>
            <h3 className="showreel-player-title">{activeShowreel.title}</h3>
            <p className="showreel-player-subtitle">{activeShowreel.subtitle}</p>
          </div>
          <div className="showreel-player-meta">
            <span className="showreel-chip">{`${String(activeIndex + 1).padStart(2, "0")} / ${String(showreels.length).padStart(2, "0")}`}</span>
            <p className="showreel-player-copy">{activeShowreel.description}</p>
            <a
              className="showreel-watch-link"
              href={`https://www.youtube.com/watch?v=${activeShowreel.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch On YouTube
            </a>
          </div>
        </div>

        <div className="showreel-player-frame">
          <iframe
            key={activeShowreel.id}
            src={`https://www.youtube.com/embed/${activeShowreel.id}`}
            title={activeShowreel.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="showreel-bounce-deck">
        <BounceCards
          className="showreel-bounce-cards"
          images={thumbnails}
          labels={showreels.map((item) => item.title)}
          activeIndex={activeIndex}
          onCardSelect={setActiveIndex}
          containerWidth="100%"
          containerHeight={260}
          animationDelay={0.35}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          enableHover
          hoverSpreadOffset={120}
          cardWidth={188}
        />
      </div>

      <p className="showreel-deck-hint">Hover to fan out the deck and click a card to switch the featured reel.</p>
    </div>
  );
}

const rootElement = document.getElementById("showreel-bounce-root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ShowreelBounce />
    </React.StrictMode>
  );
}
