import { useEffect, useRef } from 'react';
import './SewingThread.css';

// Smooth spline (Catmull-Rom -> cubic Bezier) authored in a 400 x 2200 design
// space, with one closed loop spliced in for a hand-drawn "doodle" moment.
// It's only used as geometry: we sample it and re-project the samples into
// real pixels, so nothing on screen is ever non-uniformly stretched.
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
const DESIGN_W = 400;
const DESIGN_H = 2200;

// Running stitch, in screen pixels: the thread shows on top of the fabric for
// OVER px, then dives underneath for UNDER px.
const OVER = 18;
const UNDER = 11;
const PERIOD = OVER + UNDER;

// Needle, in screen pixels, measured back from the tip.
const NEEDLE_LEN = 62;
const NEEDLE_HALF_W = 1.45;
const TIP_TAPER = 24;
const EYE_FROM_BACK = 7.5;
const EYE_HALF_LEN = 3.6;
const EYE_HALF_H = 0.55;

// Resampling resolution for the pixel-space curve.
const STEP = 1.5;

// How quickly the stitching catches up to the scroll position (ms time
// constant). Gives the needle a bit of weight instead of teleporting.
const FOLLOW_MS = 140;

// Where on screen the needle rides, as a fraction of viewport height.
const NEEDLE_VIEWPORT_Y = 0.55;

const f = (n) => n.toFixed(1);

// Needle outline in local coordinates: tip at (0, 0), pointing along +x,
// with a long gradual taper to the point and a rounded head at the back.
const NEEDLE_D = (() => {
    const head = -NEEDLE_LEN + NEEDLE_HALF_W;
    const xs = [];
    for (let x = head; x < 0; x += 1) xs.push(x);
    xs.push(0);
    const halfW = (x) =>
        -x >= TIP_TAPER ? NEEDLE_HALF_W : NEEDLE_HALF_W * Math.pow(-x / TIP_TAPER, 0.62);
    const top = xs.map((x) => `${f(x)} ${(-halfW(x)).toFixed(2)}`).join(' L ');
    const bottom = xs
        .slice(0, -1)
        .reverse()
        .map((x) => `${f(x)} ${halfW(x).toFixed(2)}`)
        .join(' L ');
    const r = NEEDLE_HALF_W;
    return `M ${top} L ${bottom} A ${r} ${r} 0 0 1 ${f(head)} ${-r} Z`;
})();

// Elongated eye slot, a stadium centred EYE_FROM_BACK from the head.
const EYE_X = -NEEDLE_LEN + EYE_FROM_BACK;
const EYE_D = (() => {
    const a = EYE_X - EYE_HALF_LEN + EYE_HALF_H;
    const b = EYE_X + EYE_HALF_LEN - EYE_HALF_H;
    const h = EYE_HALF_H;
    return `M ${a} ${-h} L ${b} ${-h} A ${h} ${h} 0 0 1 ${b} ${h} L ${a} ${h} A ${h} ${h} 0 0 1 ${a} ${-h} Z`;
})();

// Scroll distance from the very top of the page before anything shows.
const TOP_HIDE_PX = 24;

const SewingThread = () => {
    const stageRef = useRef(null);
    const svgRef = useRef(null);
    const geomRef = useRef(null);
    const refs = {
        stitches: useRef(null),
        stitchShadow: useRef(null),
        stitchSheen: useRef(null),
        holes: useRef(null),
        ripple: useRef(null),
        needle: useRef(null),
        needleShadow: useRef(null),
        under: useRef(null),
        tail: useRef(null),
    };

    useEffect(() => {
        const stage = stageRef.current;
        const svg = svgRef.current;
        const el = Object.fromEntries(Object.entries(refs).map(([k, r]) => [k, r.current]));
        if (!stage || !svg) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // --- Geometry: sample the design curve, project to pixels, resample
        // evenly by pixel arc length so index = distance / STEP. ---
        const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        probe.setAttribute('d', THREAD_D);
        const designLen = probe.getTotalLength();
        const raw = [];
        for (let i = 0; i <= 1600; i++) {
            const p = probe.getPointAtLength((i / 1600) * designLen);
            raw.push([p.x / DESIGN_W, p.y / DESIGN_H]);
        }

        const buildGeometry = () => {
            const w = stage.clientWidth;
            const h = stage.clientHeight;
            svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
            const pts = raw.map(([u, v]) => [u * w, v * h]);
            const cum = [0];
            for (let i = 1; i < pts.length; i++) {
                cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
            }
            const total = cum[cum.length - 1];
            const n = Math.floor(total / STEP) + 1;
            const xs = new Float32Array(n);
            const ys = new Float32Array(n);
            let j = 0;
            for (let i = 0; i < n; i++) {
                const s = i * STEP;
                while (j < cum.length - 2 && cum[j + 1] < s) j++;
                const t = (s - cum[j]) / (cum[j + 1] - cum[j] || 1);
                xs[i] = pts[j][0] + (pts[j + 1][0] - pts[j][0]) * t;
                ys[i] = pts[j][1] + (pts[j + 1][1] - pts[j][1]) * t;
            }
            const length = (n - 1) * STEP;

            // Pre-build each completed stitch's path segment and hole marks,
            // so a frame only has to join a prefix of these.
            const stitchCount = Math.ceil(length / PERIOD);
            const stitchD = [];
            const underD = [];
            const holeD = []; // hole 2k is at k * PERIOD, 2k + 1 at k * PERIOD + OVER
            for (let k = 0; k < stitchCount; k++) {
                const a = k * PERIOD;
                stitchD.push(segmentD(xs, ys, a, Math.min(a + OVER, length)));
                underD.push(segmentD(xs, ys, Math.min(a + OVER, length), Math.min(a + PERIOD, length)));
                holeD.push(dotD(xs, ys, a), dotD(xs, ys, Math.min(a + OVER, length)));
            }
            // Running max of y along the curve, so a scroll depth can be
            // turned into "how far along the thread" with a binary search.
            // Inside the loop y backs up, so the max stays flat and the
            // needle whips around the loop as a single gesture.
            const maxY = new Float32Array(n);
            for (let i = 0; i < n; i++) maxY[i] = Math.max(ys[i], i ? maxY[i - 1] : 0);
            geomRef.current = { xs, ys, maxY, length, stitchD, underD, holeD };
        };

        // Point + unit tangent at arc length s.
        const frameAt = (s) => {
            const { xs, ys, length } = geomRef.current;
            const c = Math.max(0, Math.min(length, s));
            const i = Math.min(xs.length - 2, Math.floor(c / STEP));
            const t = c / STEP - i;
            const x = xs[i] + (xs[i + 1] - xs[i]) * t;
            const y = ys[i] + (ys[i + 1] - ys[i]) * t;
            const i0 = Math.max(0, i - 2);
            const i1 = Math.min(xs.length - 1, i + 3);
            const ang = Math.atan2(ys[i1] - ys[i0], xs[i1] - xs[i0]);
            return { x, y, ang };
        };

        const segmentD = (xs, ys, a, b) => {
            if (b <= a) return '';
            const i0 = Math.ceil(a / STEP);
            const i1 = Math.floor(b / STEP);
            const at = (s) => {
                const i = Math.min(xs.length - 2, Math.floor(s / STEP));
                const t = s / STEP - i;
                return `${f(xs[i] + (xs[i + 1] - xs[i]) * t)} ${f(ys[i] + (ys[i + 1] - ys[i]) * t)}`;
            };
            let d = `M ${at(a)}`;
            for (let i = i0; i <= i1; i += 2) d += ` L ${f(xs[i])} ${f(ys[i])}`;
            return `${d} L ${at(b)}`;
        };

        const dotD = (xs, ys, s) => {
            const i = Math.min(xs.length - 1, Math.round(s / STEP));
            return `M ${f(xs[i])} ${f(ys[i])} h 0 `;
        };

        // --- Animation state (all in pixels of arc length) ---
        let target = 0;
        let current = 0;
        let velocity = 0; // px per ms
        let lastT = 0;
        let rafId = 0;
        let atTop = true;

        const readScroll = () => {
            const { maxY, length } = geomRef.current;
            atTop = window.scrollY < TOP_HIDE_PX;
            if (atTop) {
                // Rewind to the start while fading out.
                target = 0;
                return;
            }
            const rect = stage.getBoundingClientRect();
            const y = -rect.top + window.innerHeight * NEEDLE_VIEWPORT_Y;
            let lo = 0;
            let hi = maxY.length - 1;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (maxY[mid] < y) lo = mid + 1;
                else hi = mid;
            }
            target = Math.min(length, lo * STEP);
        };

        const render = () => {
            const g = geomRef.current;
            const { stitchD, underD, holeD } = g;
                const tipS = current;
            const eyeS = tipS - NEEDLE_LEN + EYE_FROM_BACK;

            // The needle is rigid, so it lies on the chord from its back to
            // its tip rather than the tangent; on tight turns the tangent
            // would swing the back end far off the thread.
            const tip = frameAt(tipS);
            const back = frameAt(tipS - NEEDLE_LEN);
            const ang = tipS > NEEDLE_LEN ? Math.atan2(tip.y - back.y, tip.x - back.x) : tip.ang;
            const deg = (ang * 180) / Math.PI;
            const eyeX = tip.x + Math.cos(ang) * EYE_X;
            const eyeY = tip.y + Math.sin(ang) * EYE_X;
            const visible = !atTop && current > 1;
            svg.style.opacity = visible ? '1' : '0';

            // Thread: every completed stitch, plus the in-progress one, which
            // runs up to the needle's eye (the thread follows the eye, not
            // the tip).
            const threadEnd = Math.max(0, eyeS);
            const k = Math.floor(threadEnd / PERIOD);
            const within = threadEnd - k * PERIOD;
            let d = stitchD.slice(0, k).join(' ');
            let under = underD.slice(0, k).join(' ');
            if (within > 0) {
                d += ' ' + segmentD(g.xs, g.ys, k * PERIOD, k * PERIOD + Math.min(within, OVER));
                // Finish the working stitch exactly at the (rigid) eye.
                if (within <= OVER) d += ` L ${f(eyeX)} ${f(eyeY)}`;
            }
            if (within > OVER) {
                under += ' ' + segmentD(g.xs, g.ys, k * PERIOD + OVER, k * PERIOD + within);
            }
            el.under.setAttribute('d', under);
            el.stitches.setAttribute('d', d);
            el.stitchShadow.setAttribute('d', d);
            el.stitchSheen.setAttribute('d', d);

            // Holes appear as soon as the tip punches them.
            const holeCount = 2 * Math.floor(tipS / PERIOD) + 1 + (tipS % PERIOD >= OVER ? 1 : 0);
            el.holes.setAttribute('d', holeD.slice(0, holeCount).join(''));

            // Ripple: fabric pucker around the most recent hole the tip went
            // through, easing out over the next ~16px of travel.
            const phase = ((tipS % PERIOD) + PERIOD) % PERIOD;
            const lastHole = phase >= OVER ? tipS - (phase - OVER) : tipS - phase;
            const since = tipS - lastHole;
            const rp = frameAt(lastHole);
            const fade = Math.max(0, 1 - since / 16);
            el.ripple.setAttribute('cx', f(rp.x));
            el.ripple.setAttribute('cy', f(rp.y));
            el.ripple.setAttribute('r', f(1.5 + since * 0.35));
            el.ripple.style.opacity = visible ? String(fade * 0.55) : '0';

            const xf = `translate(${f(tip.x)} ${f(tip.y)}) rotate(${deg.toFixed(2)})`;
            el.needle.setAttribute('transform', xf);
            el.needleShadow.setAttribute('transform', xf);

            // Loose tail: droops toward screen-down whichever way the needle
            // points, and swings against the direction of travel.
            const sway = Math.max(-6, Math.min(6, -velocity * 3));
            const gx = Math.sin(ang); // screen "down" in the needle's frame
            const gy = Math.cos(ang);
            const pt = (along, drop, side) =>
                `${f(EYE_X - along + gx * drop)} ${f(gy * drop + side)}`;
            el.tail.setAttribute(
                'd',
                `M ${f(EYE_X)} 0 C ${pt(6, 1.5, sway * 0.2)}, ${pt(11, 5, sway * 0.6)}, ${pt(13, 11, sway)}`
            );
        };

        const tick = (t) => {
            const dt = lastT ? Math.min(64, t - lastT) : 16;
            lastT = t;
            const prev = current;
            const alpha = reduceMotion ? 1 : 1 - Math.exp(-dt / FOLLOW_MS);
            current += (target - current) * alpha;
            if (Math.abs(target - current) < 0.05) current = target;
            // Velocity in progress/ms, lightly smoothed.
            velocity += ((current - prev) / dt - velocity) * 0.25;
            render();
            if (current !== target || Math.abs(velocity) > 0.002) {
                rafId = requestAnimationFrame(tick);
            } else {
                velocity = 0;
                render();
                rafId = 0;
                lastT = 0;
            }
        };

        const kick = () => {
            readScroll();
            if (!rafId) rafId = requestAnimationFrame(tick);
        };

        buildGeometry();
        readScroll();
        current = target;
        render();

        const ro = new ResizeObserver(() => {
            buildGeometry();
            kick();
        });
        ro.observe(stage);
        window.addEventListener('scroll', kick, { passive: true });
        window.addEventListener('resize', kick);
        return () => {
            ro.disconnect();
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', kick);
            window.removeEventListener('resize', kick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="sewing-thread-stage" ref={stageRef} aria-hidden="true">
            <svg className="sewing-thread-svg" ref={svgRef}>
                <defs>
                    {/* Shaded across the needle's width, in its local frame. */}
                    <linearGradient
                        id="needleSteel"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1={-NEEDLE_HALF_W}
                        x2="0"
                        y2={NEEDLE_HALF_W}
                    >
                        <stop offset="0%" stopColor="#f7f9fa" />
                        <stop offset="30%" stopColor="#e3e7ea" />
                        <stop offset="65%" stopColor="#a9b1b7" />
                        <stop offset="100%" stopColor="#737c83" />
                    </linearGradient>
                </defs>

                {/* Soft cast shadows sit under everything, offset down-right. */}
                <g transform="translate(1 1.8)">
                    <path ref={refs.stitchShadow} className="st-stitch-shadow" />
                    <g ref={refs.needleShadow}>
                        <path d={NEEDLE_D} className="st-needle-shadow" />
                    </g>
                </g>

                {/* Thread seen faintly through the fabric. */}
                <path ref={refs.under} className="st-under" />

                <path ref={refs.holes} className="st-holes" />
                <circle ref={refs.ripple} className="st-ripple" r="0" />

                <path ref={refs.stitches} className="st-stitch" />
                {/* Dashed highlight reads as twisted thread ply. */}
                <path ref={refs.stitchSheen} className="st-stitch-sheen" />

                <g ref={refs.needle}>
                    <path d={NEEDLE_D} className="st-needle" />
                    {/* Specular streak along the shaft. */}
                    <line
                        className="st-needle-glint"
                        x1={-NEEDLE_LEN + 13}
                        y1={-NEEDLE_HALF_W * 0.4}
                        x2={-TIP_TAPER * 0.45}
                        y2={-NEEDLE_HALF_W * 0.25}
                    />
                    <path d={EYE_D} className="st-eye" />
                    {/* Thread passing through the eye, then the loose tail. */}
                    <path ref={refs.tail} className="st-tail" />
                </g>
            </svg>
        </div>
    );
};

export default SewingThread;
