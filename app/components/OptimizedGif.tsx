"use client";

import { useState, useEffect, useRef, memo } from 'react';

interface OptimizedGifProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  placeholderColor?: string;
}

/**
 * OptimizedGif - Component for optimal GIF loading with:
 * - Lazy loading via Intersection Observer
 * - Smooth fade-in animation when loaded
 * - Placeholder with gradient while loading
 * - Priority loading for above-the-fold content
 * - Mobile-optimized loading thresholds
 */
const OptimizedGif = memo(({
  src,
  alt,
  className = '',
  priority = false,
  objectFit = 'cover',
  placeholderColor = 'rgba(30, 30, 30, 1)'
}: OptimizedGifProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        // Load GIFs when they're 300px away from viewport (mobile-friendly)
        rootMargin: '300px 0px 300px 0px',
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Preload image when in view
  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      setHasError(true);
    };
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isInView, src]);

  return (
    <div
      ref={containerRef}
      className={`optimized-gif-container relative overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholderColor,
      }}
    >
      {/* Animated placeholder gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: `linear-gradient(
            135deg,
            ${placeholderColor} 0%,
            rgba(50, 50, 50, 0.8) 50%,
            ${placeholderColor} 100%
          )`,
          backgroundSize: '200% 200%',
          animation: isInView && !isLoaded ? 'shimmer 1.5s ease-in-out infinite' : 'none'
        }}
      />
      
      {/* Loading spinner for better UX */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}

      {/* Actual GIF image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectFit,
          }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
          <span className="text-white/50 text-sm">Error al cargar</span>
        </div>
      )}
    </div>
  );
});

OptimizedGif.displayName = 'OptimizedGif';

export default OptimizedGif;













