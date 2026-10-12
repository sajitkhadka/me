type LogoProps = React.SVGAttributes<SVGSVGElement> & { title?: string };

/**
 * An "S" drawn as one route between two nodes: a request leaving one service and landing on another.
 * Uses currentColor for the stroke and the primary token for the nodes, so it follows the theme.
 */
export function Logo({ title = "Sajit Khadka", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-label={title} fill="none" {...props}>
      <path
        d="M23 8.6C21.6 7 19.2 6 16 6c-4.2 0-7 2-7 5 0 3.2 3.2 4.2 7 5 3.8.8 7 1.8 7 5 0 3-2.8 5-7 5-3.2 0-5.7-1-7.2-2.7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="23.6" cy="9.2" r="2.7" fill="hsl(var(--primary))" />
      <circle cx="8.4" cy="22.8" r="2.7" fill="hsl(var(--primary))" />
    </svg>
  );
}
