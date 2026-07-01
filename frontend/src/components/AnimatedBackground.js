import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const AnimatedBackground = ({ palette = {} }) => {
  const { isDark } = useDarkMode();

  const defaultPalette = {
    primary: isDark ? '#06b6d4' : '#22c55e',
    secondary: isDark ? '#3b82f6' : '#38bdf8',
    accent: isDark ? '#a855f7' : '#4f46e5',
    extra: isDark ? '#f59e0b' : '#f472b6'
  };

  const p = { ...defaultPalette, ...palette };

  // Inline CSS variables for gradients used by the SVG
  const vars = {
    '--wave-primary': p.primary,
    '--wave-secondary': p.secondary,
    '--wave-accent': p.accent,
    '--wave-color-1': p.primary,
    '--wave-color-2': p.secondary,
    '--wave-color-3': p.accent,
    '--wave-color-4': p.extra
  };

  return (
    <div aria-hidden className="animated-bg" style={vars}>
      <svg className="wave-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--wave-color-1, #0f766e)" stopOpacity="0.95" />
            <stop offset="33%" stopColor="var(--wave-color-2, #06b6d4)" stopOpacity="0.9" />
            <stop offset="66%" stopColor="var(--wave-color-3, #6366f1)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--wave-color-4, #a855f7)" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <ellipse className="wave-glow glow-one" cx="260" cy="220" rx="520" ry="320" fill="url(#glow)" opacity="0.22" />
        <ellipse className="wave-glow glow-two" cx="1530" cy="820" rx="620" ry="360" fill="url(#glow)" opacity="0.18" />

        {/* Multiple curved path waves for better cross-browser motion */}
        <g className="wave-layer path-layer layer4">
          <path d="M0 620 C 280 520 600 720 960 660 C 1320 600 1620 760 1920 680 L1920 1080 L0 1080 Z" fill="url(#g1)" opacity="0.42" />
        </g>

        <g className="wave-layer path-layer layer3">
          <path d="M0 720 C 300 620 560 820 960 760 C 1360 700 1640 860 1920 780 L1920 1080 L0 1080 Z" fill="url(#g1)" opacity="0.34" />
        </g>

        <g className="wave-layer path-layer layer2">
          <path d="M0 820 C 260 720 520 910 960 850 C 1400 790 1600 950 1920 870 L1920 1080 L0 1080 Z" fill="url(#g1)" opacity="0.28" />
        </g>

        <g className="wave-layer path-layer layer1">
          <path d="M0 900 C 240 800 480 1000 960 940 C 1440 880 1560 1030 1920 950 L1920 1080 L0 1080 Z" fill="url(#g1)" opacity="0.24" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
 
