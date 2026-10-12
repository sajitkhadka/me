"use client";

import { useEffect, useRef } from "react";

const CELL = 56;
const TAIL = 7; // segments of fading trail behind a packet

type Packet = { x: number; y: number; dx: number; dy: number; speed: number; hue: number; trail: [number, number][] };

/**
 * Packets travelling along a faint grid and turning at the junctions: events moving between
 * services. Decorative only. It pauses when scrolled away or the tab is hidden, and draws one still
 * frame when the visitor asks for reduced motion.
 */
export default function SignalField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let packets: Packet[] = [];
    let raf = 0;
    let visible = true;
    let rgb = "42, 240, 168";

    const readColour = () => {
      // --primary is "H S% L%"; convert it once per theme change so frames stay cheap.
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
      const m = raw.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
      if (!m) return;
      const [h, s, l] = [Number(m[1]), Number(m[2]) / 100, Number(m[3]) / 100];
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
      };
      rgb = `${f(0)}, ${f(8)}, ${f(4)}`;
    };

    const spawn = (): Packet => {
      const horizontal = Math.random() < 0.5;
      const dir = Math.random() < 0.5 ? 1 : -1;
      const col = Math.floor(Math.random() * (width / CELL + 1));
      const row = Math.floor(Math.random() * (height / CELL + 1));
      return {
        x: col * CELL,
        y: row * CELL,
        dx: horizontal ? dir : 0,
        dy: horizontal ? 0 : dir,
        speed: 0.5 + Math.random() * 0.9,
        hue: Math.random(),
        trail: [],
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(6, Math.min(26, Math.round((width * height) / 38000)));
      packets = Array.from({ length: count }, spawn);
    };

    const step = (p: Packet) => {
      p.x += p.dx * p.speed;
      p.y += p.dy * p.speed;
      const onJunction = Math.abs(p.x % CELL) < p.speed && Math.abs(p.y % CELL) < p.speed;
      if (onJunction) {
        p.x = Math.round(p.x / CELL) * CELL;
        p.y = Math.round(p.y / CELL) * CELL;
        if (Math.random() < 0.28) {
          // turn left or right
          const turn = Math.random() < 0.5 ? 1 : -1;
          [p.dx, p.dy] = [-p.dy * turn || 0, p.dx * turn || 0];
        }
      }
      p.trail.push([p.x, p.y]);
      if (p.trail.length > TAIL * 6) p.trail.shift();
      if (p.x < -CELL || p.x > width + CELL || p.y < -CELL || p.y > height + CELL) Object.assign(p, spawn());
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of packets) {
        const n = p.trail.length;
        for (let i = 1; i < n; i += 3) {
          const a = (i / n) ** 2;
          ctx.strokeStyle = `rgba(${rgb}, ${0.5 * a})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p.trail[i - 1][0], p.trail[i - 1][1]);
          ctx.lineTo(p.trail[Math.min(i + 3, n - 1)][0], p.trail[Math.min(i + 3, n - 1)][1]);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${rgb}, 0.95)`;
        ctx.shadowColor = `rgba(${rgb}, 0.9)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const frame = () => {
      packets.forEach(step);
      draw();
      raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (!raf && !reduced) raf = requestAnimationFrame(frame);
    };

    readColour();
    resize();
    if (reduced) {
      // One still frame: run the packets forward a little so there is something to see.
      for (let i = 0; i < 160; i++) packets.forEach(step);
      draw();
    } else {
      start();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const theme = new MutationObserver(() => {
      readColour();
      if (reduced) draw();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const onVisibility = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
