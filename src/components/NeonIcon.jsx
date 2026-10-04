const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }

const icons = {
  coffee: (
    <>
      <g className="ni-steam"><path d="M22 16c-3-4 3-6 0-10" /><path d="M32 16c-3-4 3-6 0-10" /><path d="M42 16c-3-4 3-6 0-10" /></g>
      <path d="M12 24h34v12a14 14 0 0 1-14 14h-6A14 14 0 0 1 12 36z" />
      <path d="M46 28h4a6 6 0 0 1 0 12h-5" />
      <path d="M10 58h40" />
    </>
  ),
  flower: (
    <g className="ni-sway">
      <path d="M32 34v26" />
      <path d="M32 52c-9 0-13-6-13-11 8 0 13 4 13 11zM32 48c8 0 12-5 12-10-7 0-12 4-12 10z" />
      <path className="ni-bloom" d="M20 10l6 8 6-10 6 10 6-8v12a12 12 0 0 1-24 0z" />
    </g>
  ),
  radiator: (
    <>
      <g className="ni-heat"><path d="M20 16c-3-4 3-6 0-10" /><path d="M32 16c-3-4 3-6 0-10" /><path d="M44 16c-3-4 3-6 0-10" /></g>
      <rect x="8" y="24" width="48" height="28" rx="5" />
      <path className="ni-fins" d="M18 24v28M27 24v28M37 24v28M46 24v28" />
      <path d="M14 52v6M50 52v6" />
    </>
  ),
  person: (
    <>
      <g className="ni-bob"><circle cx="24" cy="22" r="9" /><path d="M8 56c0-11 7-17 16-17s16 6 16 17" /></g>
      <path d="M38 6h18a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-8l-6 5v-5h-4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" />
      <g className="ni-dots" stroke="none" fill="currentColor"><circle cx="43" cy="14" r="1.6" /><circle cx="47.5" cy="14" r="1.6" /><circle cx="52" cy="14" r="1.6" /></g>
    </>
  ),
}

export default function NeonIcon({ name }) {
  return (
    <span className={`neon-ic neon-${name}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" {...S}>{icons[name]}</svg>
    </span>
  )
}
