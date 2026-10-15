import { useEffect, useRef } from 'react';

// Частицы, которые медленно собираются в самолётик Telegram и снова рассыпаются.
// Цвет берётся из --accent, так что работает и в светлой, и в тёмной теме.

const CYCLE_MS = 11000; // полный цикл анимации
// доли цикла: 0–0.15 парят · 0.15–0.42 собираются · 0.42–0.72 самолётик · 0.72–1 рассыпаются
const GATHER_START = 0.15;
const HOLD_START = 0.42;
const SCATTER_START = 0.72;
const MOVE_DURATION = 0.2; // сколько длится перелёт одной частицы (доля цикла)
const MAX_DELAY = 0.12; // случайная задержка, чтобы частицы двигались не строем

const TAU = 6.283;
const FALLBACK_ACCENT = '#3EB6FF';
const SPRITE_RADIUS = 16;
const MAX_DPR = 3;
const PLANE_SCALE = 0.2; // размер самолётика относительно холста
const TOTAL_PARTICLES = 520; // всего частиц (контур + заливка)
const SPRING = 0.05; // сила притяжения к цели
const DAMPING = 0.78; // затухание скорости

// самолётик в координатах −1…1: контур + линия сгиба крыла
const PLANE_OUTLINE = [
  [-1, 0.02],
  [1, -0.72],
  [0.42, 0.74],
  [0.06, 0.26],
];
const OUTLINE_POINTS = [90, 70, 26, 66]; // сколько точек на каждой стороне контура

// облако, в котором частицы парят: эллипс, гуще в центре, реже к краям
const CLOUD_RADIUS = 0.46;

const isInsidePolygon = (px, py, polygon) => {
  let inside = false;
  for (let current = 0, previous = polygon.length - 1; current < polygon.length; previous = current++) {
    const [xi, yi] = polygon[current],
      [xj, yj] = polygon[previous];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

// точки, в которые собираются частицы; isEdge — точка контура (крупнее и ярче)
function buildTargets() {
  const targets = [];
  const addLine = (from, to, count) => {
    for (let step = 0; step < count; step++) {
      const fraction = step / count;
      targets.push({
        x: from[0] + (to[0] - from[0]) * fraction,
        y: from[1] + (to[1] - from[1]) * fraction,
        isEdge: true,
      });
    }
  };
  PLANE_OUTLINE.forEach((point, index) =>
    addLine(point, PLANE_OUTLINE[(index + 1) % PLANE_OUTLINE.length], OUTLINE_POINTS[index]),
  );
  addLine([1, -0.72], [0.06, 0.26], 70); // сгиб от носа к центру
  addLine([0.06, 0.26], [0.12, 0.6], 18); // хвостик сгиба
  // лёгкая заливка случайными точками внутри контура
  let attempts = 0;
  while (targets.length < TOTAL_PARTICLES && attempts++ < 20000) {
    const px = Math.random() * 2 - 1,
      py = Math.random() * 1.6 - 0.8;
    if (isInsidePolygon(px, py, PLANE_OUTLINE)) targets.push({ x: px, y: py, isEdge: false });
  }
  return targets;
}

function randomCloudPosition() {
  const angle = Math.random() * TAU;
  const distance = Math.pow(Math.random(), 0.75) * CLOUD_RADIUS;
  return {
    homeX: 0.5 + Math.cos(angle) * distance,
    homeY: 0.5 + Math.sin(angle) * distance * 0.82,
    edge: distance / CLOUD_RADIUS, // 0 — центр облака, 1 — край
  };
}

const smoothstep = (value) => value * value * (3 - 2 * value);
const clamp01 = (value) => Math.min(1, Math.max(0, value));

// насколько частица «собрана» в самолётик: 0 — в облаке, 1 — на своём месте
function assembly(phase, delay) {
  if (phase < GATHER_START) return 0;
  if (phase < HOLD_START) return smoothstep(clamp01((phase - GATHER_START - delay) / MOVE_DURATION));
  if (phase < SCATTER_START) return 1;
  return 1 - smoothstep(clamp01((phase - SCATTER_START - delay) / MOVE_DURATION));
}

export default function ParticlePlane() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0,
      height = 0,
      dpr = 1,
      frame = 0,
      isVisible = true;
    let color = '',
      sprite = null,
      isDark = true;

    // светящаяся точка рисуется один раз и потом только копируется — так плавно даже на слабом телефоне
    const makeSprite = () => {
      const size = SPRITE_RADIUS * 2;
      const spriteCanvas = document.createElement('canvas');
      spriteCanvas.width = spriteCanvas.height = size;
      const spriteCtx = spriteCanvas.getContext('2d');
      const gradient = spriteCtx.createRadialGradient(
        SPRITE_RADIUS,
        SPRITE_RADIUS,
        0,
        SPRITE_RADIUS,
        SPRITE_RADIUS,
        SPRITE_RADIUS,
      );
      gradient.addColorStop(0, isDark ? '#fff' : color);
      gradient.addColorStop(0.18, color);
      gradient.addColorStop(0.45, color + '55');
      gradient.addColorStop(1, color + '00');
      spriteCtx.fillStyle = gradient;
      spriteCtx.fillRect(0, 0, size, size);
      sprite = spriteCanvas;
    };

    // цвет точек — из --accent, режим наложения — по яркости фона --paper
    const readColors = () => {
      const styles = getComputedStyle(canvas);
      const accent = styles.getPropertyValue('--accent').trim();
      const hex = accent.startsWith('#') && accent.length === 7 ? accent : FALLBACK_ACCENT;
      const paper = styles.getPropertyValue('--paper').trim();
      const darkBackground = /^#[0-9a-f]{6}$/i.test(paper)
        ? parseInt(paper.slice(1, 3), 16) + parseInt(paper.slice(3, 5), 16) + parseInt(paper.slice(5, 7), 16) < 384
        : true;
      if (hex !== color || darkBackground !== isDark) {
        color = hex;
        isDark = darkBackground;
        makeSprite();
      }
    };

    const particles = buildTargets().map((target) => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      target,
      ...randomCloudPosition(),
      orbitPhase: Math.random() * TAU,
      orbitSpeed: 0.15 + Math.random() * 0.25,
      depth: 0.5 + Math.random() * 0.8, // множитель размера и яркости
      delay: Math.random() * MAX_DELAY,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const newWidth = Math.round(canvas.clientWidth * dpr),
        newHeight = Math.round(canvas.clientHeight * dpr);
      if (newWidth === width && newHeight === height) return; // адресная строка на телефоне дёргает resize — не пересобираем
      const isFirst = !width;
      width = newWidth;
      height = newHeight;
      canvas.width = width;
      canvas.height = height;
      if (isFirst)
        particles.forEach((particle) => {
          particle.x = particle.homeX * width;
          particle.y = particle.homeY * height;
        });
    };
    resize();
    readColors();

    const planeSize = () => Math.min(width, height * 1.6) * PLANE_SCALE;

    // progress — средняя «собранность» (0…1): чем ближе к самолётику, тем ярче точки
    const draw = (progress) => {
      ctx.clearRect(0, 0, width, height);
      // мягкое свечение — только подложка, слабое
      ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';
      particles.forEach((particle) => {
        const glow = (particle.target.isEdge ? 4 : 3) * particle.depth * dpr;
        ctx.globalAlpha = (0.08 + 0.22 * progress) * (1 - particle.edge * (1 - progress) * 0.6);
        ctx.drawImage(sprite, particle.x - glow, particle.y - glow, glow * 2, glow * 2);
      });
      // резкие ядра точек
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = color;
      particles.forEach((particle) => {
        const radius = (particle.target.isEdge ? 1.15 : 0.85) * particle.depth * dpr * (0.85 + 0.25 * progress);
        ctx.globalAlpha = Math.min(
          1,
          (0.45 + 0.55 * progress) * (0.6 + 0.4 * particle.depth) * (1 - particle.edge * (1 - progress) * 0.7),
        );
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius, 0, TAU);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    // без анимации — сразу готовый самолётик
    if (reduceMotion) {
      const scale = planeSize();
      particles.forEach((particle) => {
        particle.x = width / 2 + particle.target.x * scale;
        particle.y = height / 2 + particle.target.y * scale;
      });
      draw(1);
      return;
    }

    const start = performance.now();
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (!isVisible) return;
      const time = now - start;
      const phase = (time % CYCLE_MS) / CYCLE_MS;
      const scale = planeSize(),
        centerX = width / 2,
        centerY = height / 2;
      const bob = Math.sin(time / 900) * 3 * dpr; // самолётик слегка покачивается
      let progressSum = 0;
      particles.forEach((particle) => {
        // «облачная» позиция: каждая точка медленно плавает по своей орбите
        const floatX =
          (particle.homeX + Math.sin((time / 1000) * particle.orbitSpeed + particle.orbitPhase) * 0.05) * width;
        const floatY =
          (particle.homeY + Math.cos((time / 1000) * particle.orbitSpeed * 0.8 + particle.orbitPhase) * 0.06) * height;
        const planeX = centerX + particle.target.x * scale,
          planeY = centerY + particle.target.y * scale + bob;
        const assembled = assembly(phase, particle.delay);
        progressSum += assembled;
        // цель — между облаком и самолётиком; к ней частица тянется как на пружинке
        const goalX = floatX + (planeX - floatX) * assembled,
          goalY = floatY + (planeY - floatY) * assembled;
        particle.vx = (particle.vx + (goalX - particle.x) * SPRING) * DAMPING;
        particle.vy = (particle.vy + (goalY - particle.y) * SPRING) * DAMPING;
        particle.x += particle.vx;
        particle.y += particle.vy;
      });
      draw(progressSum / particles.length);
    };
    frame = requestAnimationFrame(tick);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkQuery.addEventListener?.('change', readColors);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      darkQuery.removeEventListener?.('change', readColors);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="particle-plane-wrap rise" style={{ '--delay': '460ms' }} aria-hidden="true">
      <canvas ref={canvasRef} className="particle-plane" />
    </div>
  );
}
