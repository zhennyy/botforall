import { useEffect, useMemo, useRef, useState } from 'react';

const POINTS_PER_RING = 90;

// Замкнутый «волнистый» контур, как линия уровня на топографической карте:
// окружность, вытянутая по горизонтали в 1.5 раза, с тремя наложенными синусоидами.
function contourPath(centerX, centerY, radius, phase) {
  const points = [];
  for (let step = 0; step <= POINTS_PER_RING; step++) {
    const angle = (step / POINTS_PER_RING) * Math.PI * 2;
    const ringRadius =
      radius *
      (1 +
        0.18 * Math.sin(3 * angle + phase) +
        0.1 * Math.sin(5 * angle - phase * 1.3) +
        0.06 * Math.sin(8 * angle + phase * 0.7));
    points.push(
      `${(centerX + Math.cos(angle) * ringRadius * 1.5).toFixed(1)} ${(centerY + Math.sin(angle) * ringRadius).toFixed(1)}`,
    );
  }
  return 'M' + points.join(' L') + 'Z';
}

// две «вершины»: большая слева и поменьше справа (координаты — в системе viewBox)
const PEAKS = [
  { x: -120, y: -30, rings: 26, step: 20, phaseStep: 0.28, phaseShift: 0 },
  { x: 360, y: 150, rings: 14, step: 18, phaseStep: 0.35, phaseShift: 2 },
];

export default function TopoBg() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // вне экрана вращение ставится на паузу
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const paths = useMemo(() => {
    const result = [];
    for (const peak of PEAKS) {
      for (let ring = 1; ring <= peak.rings; ring++) {
        result.push(contourPath(peak.x, peak.y, ring * peak.step, ring * peak.phaseStep + peak.phaseShift));
      }
    }
    return result;
  }, []);

  return (
    <div ref={ref} className={`topo-bg${isVisible ? '' : ' is-paused'}`} aria-hidden="true">
      <svg viewBox="-720 -400 1440 800" preserveAspectRatio="xMidYMid slice">
        <g>
          {paths.map((pathData, index) => (
            <path key={index} d={pathData} />
          ))}
        </g>
      </svg>
      <div className="topo-wash" />
    </div>
  );
}
