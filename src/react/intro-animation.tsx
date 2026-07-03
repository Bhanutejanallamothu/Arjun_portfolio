import React, { useEffect, useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/intro.css';

const IntroAnimation = () => {
    const [isActive, setIsActive] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Prevent scrolling while intro is active
        document.body.classList.add('intro-active');

        // Total animation time is roughly 5.5s
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
        }, 5500);

        const unmountTimer = setTimeout(() => {
            setIsActive(false);
            document.body.classList.remove('intro-active');
        }, 6500);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(unmountTimer);
            document.body.classList.remove('intro-active');
        };
    }, []);

    // Generate random values only once per render
    const elements = useMemo(() => {
        const qx = 12;
        const qy = 9;
        const items = [];
        
        for (let r = 0; r <= qy; r++) {
            for (let c = 0; c <= qx; c++) {
                // Fixed pseudo-random based on position to avoid hydration mismatch 
                // and keep it looking good
                const seed = Math.abs(Math.sin(r * qx + c)); 
                const rnd = seed; // random(100)/100 equivalent
                
                const top = `calc((${r} * 100%) / ${qy} + 50% / ${qy})`;
                const left = `calc(${c} * 100% / ${qx})`;
                const delay = `${rnd * -3}s`;
                const dotLeft = `calc(${c} * 100% / ${qx} + ${rnd * -40 + 41}px)`;

                items.push({ id: `item-${r}-${c}`, top, left, delay, dotLeft });
            }
        }
        return items;
    }, []);

    if (!isActive) return null;

    return (
        <div id="intro-screen" className={isFading ? 'fade-out' : ''}>
            <div id="intro-animation-root">
                <div className="card">
                    <img src="/profile.jpeg" alt="Arjun Vasudev" />
                    <h1 className="name">
                        <span>A</span>
                        <span>R</span>
                        <span>J</span>
                        <span>U</span>
                        <span>N</span>
                    </h1>
                </div>

                <div className="wrapper">
                    {elements.map((el) => (
                        <React.Fragment key={el.id}>
                            <div className="dot" style={{ top: el.top, left: el.dotLeft, animationDelay: el.delay }}></div>
                            <div className="dot" style={{ top: el.top, left: el.dotLeft, animationDelay: el.delay }}></div>
                            <div className="bg-line" style={{ top: el.top, left: el.left, animationDelay: el.delay }}></div>
                        </React.Fragment>
                    ))}
                    
                    <div className="logo-mkbhd">
                        <div className="skewed-box white bottom over">
                            <div className="mask">
                                <div className="line left"></div>
                            </div>
                        </div>
                        <div className="skewed-box white top over">
                            <div className="mask">
                                <div className="line left"></div>
                            </div>
                        </div>
                        <div className="skewed-box white top">
                            <div className="stripe top"></div>
                            <div className="stripe topBottom"></div>
                            <div className="stripe bottomTop"></div>
                            <div className="stripe bottom"></div>
                            <div className="mask">
                                <div className="line top"></div>
                                <div className="line right"></div>
                            </div>
                        </div>
                        <div className="skewed-box pink">
                            <div className="stripe bottom"></div>
                            <div className="stripe top"></div>
                            <div className="bg"></div>
                        </div>
                        <div className="skewed-box white bottom">
                            <div className="mask">
                                <div className="line bottom"></div>
                                <div className="line right"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stripe final-stripe right"></div>
                    <div className="stripe final-stripe left"></div>
                </div>
            </div>
        </div>
    );
};

// Mount the intro component
document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('intro-root');
    if (rootEl) {
        const root = createRoot(rootEl);
        root.render(<IntroAnimation />);
    }
});
