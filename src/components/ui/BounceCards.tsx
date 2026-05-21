import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

interface BounceCardsProps {
  className?: string;
  images?: string[];
  labels?: string[];
  activeIndex?: number;
  containerWidth?: number | string;
  containerHeight?: number | string;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  hoverSpreadOffset?: number;
  cardWidth?: number;
  onCardSelect?: (index: number) => void;
}

function toCssSize(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

export default function BounceCards({
  className = "",
  images = [],
  labels = [],
  activeIndex = 0,
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = false,
  hoverSpreadOffset = 160,
  cardWidth = 200,
  onCardSelect,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const query = gsap.utils.selector(containerRef);

      gsap.fromTo(
        query(".bounce-card"),
        { scale: 0, y: 40, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
          duration: 1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);

    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    }

    if (transformStr === "none") {
      return "rotate(0deg)";
    }

    return `${transformStr} rotate(0deg)`;
  };

  const getPushedTransform = (baseTransform: string, offsetX: number): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);

    if (match) {
      const currentX = Number.parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    }

    if (baseTransform === "none") {
      return `translate(${offsetX}px)`;
    }

    return `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const query = gsap.utils.selector(containerRef);

    images.forEach((_, index) => {
      const selector = query(`.card-${index}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[index] || "none";

      if (index === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        const offsetX = index < hoveredIdx ? -hoverSpreadOffset : hoverSpreadOffset;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        const distance = Math.abs(hoveredIdx - index);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const query = gsap.utils.selector(containerRef);

    images.forEach((_, index) => {
      const selector = query(`.card-${index}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[index] || "none";

      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={
        {
          position: "relative",
          width: toCssSize(containerWidth),
          height: toCssSize(containerHeight),
          "--bounce-card-width": `${cardWidth}px`,
        } as React.CSSProperties
      }
    >
      {images.map((src, index) => (
        <button
          key={src}
          type="button"
          className={`bounce-card card-${index} ${activeIndex === index ? "is-active" : ""}`}
          style={{ transform: transformStyles[index] ?? "none" }}
          onMouseEnter={() => pushSiblings(index)}
          onMouseLeave={resetSiblings}
          onFocus={() => pushSiblings(index)}
          onBlur={resetSiblings}
          onClick={() => onCardSelect?.(index)}
          aria-pressed={activeIndex === index}
          aria-label={labels[index] ? `Play ${labels[index]}` : `Play showreel ${index + 1}`}
        >
          <img className="bounce-card-image" src={src} alt={labels[index] ?? `showreel-${index + 1}`} />
          <span className="bounce-card-shade" />
          <span className="bounce-card-overlay">
            <span className="bounce-card-play">
              <i className="fas fa-play" aria-hidden="true"></i>
            </span>
            <span className="bounce-card-label">{labels[index] ?? `Showreel ${index + 1}`}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
