import { useEffect, useRef } from 'react';
import './SewingThread.css';

// Smooth spline (Catmull-Rom -> cubic Bezier) across the FULL width of the
// page. Every waypoint has a continuous tangent (no cusps), with one closed
// loop spliced in (a relative "c" that returns to its own start point) for
// a hand-drawn "doodle" moment.
const THREAD_D = `M 190 0
  C 181.7 15, 125 61.7, 140 90
  C 155 118.3, 288.3 141.7, 280 170
  c 35 -45 -35 -45 0 0
  C 271.7 198.3, 98.3 230, 90 260
  C 81.7 290, 191.7 318.3, 230 350
  C 268.3 381.7, 338.3 416.7, 320 450
  C 301.7 483.3, 138.3 518.3, 120 550
  C 101.7 581.7, 218.3 610, 210 640
  C 201.7 670, 61.7 701.7, 70 730
  C 78.3 758.3, 215 781.7, 260 810
  C 305 838.3, 358.3 871.7, 340 900
  C 321.7 928.3, 193.3 951.7, 150 980
  C 106.7 1008.3, 55 1040, 80 1070
  C 105 1100, 281.7 1130, 300 1160
  C 318.3 1190, 231.7 1220, 190 1250
  C 148.3 1280, 40 1310, 50 1340
  C 60 1370, 203.3 1398.3, 250 1430
  C 296.7 1461.7, 351.7 1500, 330 1530
  C 308.3 1560, 140 1581.7, 120 1610
  C 100 1638.3, 218.3 1670, 210 1700
  C 201.7 1730, 56.7 1761.7, 70 1790
  C 83.3 1818.3, 271.7 1841.7, 290 1870
  C 308.3 1898.3, 211.7 1930, 180 1960
  C 148.3 1990, 91.7 2020, 100 2050
  C 108.3 2080, 215 2115, 230 2140
  C 245 2165, 196.7 2190, 190 2200`;

// How many straight segments to approximate the curve with. The visible
// line is a plain <polyline> truncated to the current arc length, rather
// than an SVG <mask> — Safari has a real, hard-to-fully-tame compositing
// bug where an animated <mask> can cause unrelated nearby siblings to
// flicker/vanish on hover, especially over a very tall page. A polyline
// with its `points` list truncated each frame has no mask/clip involved
// at all, so there's nothing for that bug to latch onto.
const SAMPLE_COUNT = 500;

const SewingThread = () => {
    const stageRef = useRef(null);
    const threadPathRef = useRef(null);
    const visibleLineRef = useRef(null);
    const needleRef = useRef(null);

    useEffect(() => {
        const path = threadPathRef.current;
        const visibleLine = visibleLineRef.current;
        const needle = needleRef.current;
        const stage = stageRef.current;
        if (!path || !visibleLine || !needle || !stage) return;

        const pathLength = path.getTotalLength();
        const step = pathLength / SAMPLE_COUNT;

        // Pre-sample the curve once, evenly spaced by arc length. Index i
        // sits at arc length i * step, so turning an arc length into a
        // slice of this array is a plain division — no per-frame curve
        // math needed.
        const samplePoints = [];
        for (let i = 0; i <= SAMPLE_COUNT; i++) {
            const p = path.getPointAtLength(i * step);
            samplePoints.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
        }

        needle.style.opacity = '0';

        let ticking = false;
        const update = () => {
            const rect = stage.getBoundingClientRect();
            const total = rect.height - window.innerHeight * 0.5;
            const scrolled = -rect.top + window.innerHeight * 0.3;
            let progress = total > 0 ? scrolled / total : 0;
            progress = Math.max(0, Math.min(1, progress));

            // Both the visible line's length AND the needle's position are
            // driven from this exact same arc-length value, so they can
            // never drift apart (previously the line was revealed by Y
            // position while the needle moved by arc length, which
            // disagree inside loops).
            const s = pathLength * progress;
            const idx = Math.min(SAMPLE_COUNT, Math.floor(s / step));
            visibleLine.setAttribute('points', samplePoints.slice(0, idx + 1).join(' '));

            const point = path.getPointAtLength(s);
            const ahead = path.getPointAtLength(Math.min(pathLength, s + 1));
            const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * (180 / Math.PI);
            needle.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);
            // Tied purely to position, not "has ever scrolled" — so it
            // disappears again if the user scrolls back above the section.
            needle.style.opacity = progress > 0.001 ? '1' : '0';
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                update();
                ticking = false;
            });
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div className="sewing-thread-stage" ref={stageRef} aria-hidden="true">
            <svg className="sewing-thread-svg" viewBox="0 0 400 2200" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fbfcfd" />
                        <stop offset="45%" stopColor="#cdd2d6" />
                        <stop offset="100%" stopColor="#8f9599" />
                    </linearGradient>
                    {/* Cuts a small hole out of the needle body to form the eye */}
                    <mask id="eyeMask">
                        <rect x="-18" y="-2" width="36" height="4" fill="white" />
                        <ellipse cx="-11" cy="0" rx="0.9" ry="1.5" fill="black" />
                    </mask>
                </defs>

                {/* Invisible — exists only so we can query getTotalLength /
                    getPointAtLength on the real curve geometry. */}
                <path ref={threadPathRef} d={THREAD_D} fill="none" stroke="none" />

                {/* The actual visible thread: a polyline whose points are
                    truncated to the current scroll position each frame. */}
                <polyline
                    ref={visibleLineRef}
                    points=""
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeOpacity="0.85"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 6"
                />

                {/* Needle: tapered sliver with a real eye, rotated to the path's
                    tangent — visible only while scrolled into this section. */}
                <g ref={needleRef}>
                    <path
                        d="M -16 -1.2 L 10 -0.5 L 16 0 L 10 0.5 L -16 1.2 Z"
                        fill="url(#needleGrad)"
                        stroke="#7a8085"
                        strokeWidth="0.3"
                        mask="url(#eyeMask)"
                    />
                </g>
            </svg>
        </div>
    );
};

export default SewingThread;
