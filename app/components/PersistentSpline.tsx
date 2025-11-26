'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(
  () => import('@splinetool/react-spline').then((mod) => mod.default),
  {
    ssr: false,
  }
);

// Singleton to keep Spline instance alive
let splineInstance: any = null;
let isMounted = false;

interface PersistentSplineProps {
  scene: string;
  containerId: string;
  style?: React.CSSProperties;
}

export default function PersistentSpline({ scene, containerId, style }: PersistentSplineProps) {
  const [shouldRender, setShouldRender] = useState(!isMounted);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      setShouldRender(true);
    }

    return () => {
      // Don't unmount - keep the instance alive
    };
  }, []);

  const handleLoad = (spline: any) => {
    splineInstance = spline;
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id={containerId}
      style={{
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      <Spline
        scene={scene}
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

