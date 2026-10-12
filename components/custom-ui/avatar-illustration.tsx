type Props = React.SVGAttributes<SVGSVGElement> & { title?: string };

/**
 * Flat vector portrait: dark wavy hair, brown eyes, a blue collared shirt and a laptop lid with a
 * glowing prompt. Drawn from the original illustration so it stays recognisably the same person.
 * Every colour is local to the drawing, so it looks the same in light and dark.
 */
export function AvatarIllustration({ title = "Illustrated portrait of Sajit", ...props }: Props) {
  return (
    <svg viewBox="0 0 320 320" role="img" aria-label={title} {...props}>
      <defs>
        <linearGradient id="av-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f2b2c" />
          <stop offset="1" stopColor="#161a3a" />
        </linearGradient>
        <radialGradient id="av-glow" cx="0.5" cy="0.9" r="0.7">
          <stop offset="0" stopColor="#2af0a8" stopOpacity="0.38" />
          <stop offset="1" stopColor="#2af0a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="av-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b79c9" />
          <stop offset="1" stopColor="#3b4f9a" />
        </linearGradient>
        <linearGradient id="av-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0b48a" />
          <stop offset="1" stopColor="#dc9468" />
        </linearGradient>
        <clipPath id="av-clip">
          <circle cx="160" cy="160" r="160" />
        </clipPath>
      </defs>

      <g clipPath="url(#av-clip)">
        <rect width="320" height="320" fill="url(#av-bg)" />
        <rect width="320" height="320" fill="url(#av-glow)" />
        {/* faint grid, as on the site background */}
        <g stroke="#ffffff" strokeOpacity="0.05">
          {[40, 80, 120, 160, 200, 240, 280].map((n) => (
            <g key={n}>
              <line x1={n} y1="0" x2={n} y2="320" />
              <line x1="0" y1={n} x2="320" y2={n} />
            </g>
          ))}
        </g>

        {/* shoulders and shirt */}
        <path d="M24 330c4-52 38-82 92-92l44 14 44-14c54 10 88 40 92 92z" fill="url(#av-shirt)" />
        <path d="M116 238l44 52-52-6z M204 238l-44 52 52-6z" fill="#2f4182" opacity="0.55" />
        <path d="M118 236l42 38 42-38-10-10-32 22-32-22z" fill="#e9eefc" />
        <path d="M160 274v60" stroke="#2f4182" strokeWidth="2" />
        <circle cx="160" cy="298" r="2.6" fill="#e9eefc" />

        {/* neck */}
        <path d="M137 206h46v38c-8 12-38 12-46 0z" fill="#d38b60" />
        <path d="M137 224c12 10 34 10 46 0v-10c-14 8-32 8-46 0z" fill="#b97449" opacity="0.7" />

        {/* ears */}
        <ellipse cx="104" cy="168" rx="9" ry="14" fill="#e3a073" />
        <ellipse cx="216" cy="168" rx="9" ry="14" fill="#e3a073" />
        <path d="M104 163c4 1 4 9 0 11" stroke="#b97449" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M216 163c-4 1-4 9 0 11" stroke="#b97449" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* face */}
        <path d="M108 150c0-40 22-64 52-64s52 24 52 64v22c0 34-24 54-52 54s-52-20-52-54z" fill="url(#av-skin)" />
        {/* cheek blush */}
        <ellipse cx="128" cy="188" rx="12" ry="7" fill="#ee8a78" opacity="0.35" />
        <ellipse cx="192" cy="188" rx="12" ry="7" fill="#ee8a78" opacity="0.35" />

        {/* brows */}
        <path d="M122 143c8-6 20-6 28-2" stroke="#1a1d44" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M170 141c8-4 20-4 28 2" stroke="#1a1d44" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* eyes */}
        <g>
          <ellipse cx="136" cy="162" rx="12" ry="13" fill="#fbf6f2" />
          <circle cx="137" cy="163" r="8.5" fill="#6b3d2b" />
          <circle cx="137" cy="163" r="4.4" fill="#25140f" />
          <circle cx="140.4" cy="159.4" r="2.6" fill="#ffffff" />
          <path d="M123 156c4-6 20-7 26-1" stroke="#1a1d44" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </g>
        <g>
          <ellipse cx="184" cy="162" rx="12" ry="13" fill="#fbf6f2" />
          <circle cx="183" cy="163" r="8.5" fill="#6b3d2b" />
          <circle cx="183" cy="163" r="4.4" fill="#25140f" />
          <circle cx="186.4" cy="159.4" r="2.6" fill="#ffffff" />
          <path d="M171 155c6-6 22-5 26 1" stroke="#1a1d44" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </g>

        {/* nose and mouth */}
        <path d="M160 168c-3 10-5 16-1 19 3 2 8 1 9-1" stroke="#b97449" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M144 205c10 7 22 7 32 0" stroke="#9b4f3a" strokeWidth="3.4" strokeLinecap="round" fill="none" />

        {/* hair: a base mass plus overlapping curls */}
        <path
          d="M100 160c-8-34 0-68 30-84 12-8 30-12 46-8 26 2 46 20 50 52 2 14 0 30-2 40-4-14-8-24-14-32-18 6-44 8-64 0-10-4-16-10-22-16-8 14-10 32-8 48z"
          fill="#1a1f4d"
        />
        <g fill="#1a1f4d">
          <circle cx="112" cy="104" r="20" />
          <circle cx="132" cy="84" r="22" />
          <circle cx="160" cy="76" r="22" />
          <circle cx="188" cy="82" r="22" />
          <circle cx="210" cy="102" r="20" />
          <circle cx="104" cy="130" r="14" />
          <circle cx="216" cy="130" r="14" />
        </g>
        <g fill="#2e3a85">
          <path d="M126 80c6-8 18-10 26-4-8 0-16 4-20 10z" />
          <path d="M172 72c8-4 18-2 24 4-8-2-16-2-22 4z" />
          <path d="M104 100c2-10 12-18 22-18-8 4-14 10-16 20z" />
          <path d="M204 92c8 2 14 10 14 18-4-6-10-10-16-12z" />
        </g>
        {/* fringe over the forehead */}
        <path d="M112 118c8 12 22 18 40 18 14 0 28-4 38-12 6-4 12-6 18-4-6-18-24-30-44-30-26 0-44 12-52 28z" fill="#1a1f4d" />
        <path d="M120 112c10 8 22 10 34 8" stroke="#2e3a85" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* laptop lid with a glowing prompt */}
        <path d="M86 320l12-36c2-6 8-10 14-10h96c6 0 12 4 14 10l12 36z" fill="#10131f" />
        <path d="M86 320l12-36c2-6 8-10 14-10h96c6 0 12 4 14 10l12 36" fill="none" stroke="#2c3350" strokeWidth="3" />
        <g stroke="#2af0a8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M140 293l9 8-9 8" />
          <path d="M160 310h14" />
        </g>
        <circle cx="160" cy="302" r="30" fill="#2af0a8" opacity="0.07" />
      </g>
    </svg>
  );
}
