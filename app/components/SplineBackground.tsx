'use client';

import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineBackgroundProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
  isVisible?: boolean;
}

// Global instance to keep Spline alive
let globalSplineInstance: any = null;

export default function SplineBackground({ scene, className, style, isVisible = true }: SplineBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const splineRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = (spline: any) => {
    splineRef.current = spline;
    globalSplineInstance = spline;
    setIsLoaded(true);
  };

  useEffect(() => {
    // Keep the component mounted even when not visible
    // Use visibility instead of display to keep it in DOM
    if (containerRef.current) {
      containerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      containerRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Spline
        key="persistent-spline" // Stable key to prevent remounting
        scene={scene}
        className={className}
        style={style}
        onLoad={handleLoad}
      />
    </div>
  );
}

