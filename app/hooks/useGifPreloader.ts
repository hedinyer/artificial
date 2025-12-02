"use client";

import { useEffect, useState, useCallback } from 'react';

interface PreloadState {
  loaded: Set<string>;
  loading: Set<string>;
  failed: Set<string>;
}

/**
 * Hook for intelligent GIF preloading
 * - Preloads critical GIFs immediately
 * - Queues non-critical GIFs
 * - Respects network conditions
 * - Prevents duplicate loads
 */
export function useGifPreloader(
  criticalGifs: string[] = [],
  secondaryGifs: string[] = [],
  options: { delay?: number; concurrent?: number } = {}
) {
  const { delay = 100, concurrent = 2 } = options;
  const [state, setState] = useState<PreloadState>({
    loaded: new Set(),
    loading: new Set(),
    failed: new Set()
  });
  const [progress, setProgress] = useState(0);

  const preloadGif = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Skip if already loaded or loading
      if (state.loaded.has(src) || state.loading.has(src)) {
        resolve();
        return;
      }

      setState(prev => ({
        ...prev,
        loading: new Set([...prev.loading, src])
      }));

      const img = new Image();
      
      img.onload = () => {
        setState(prev => ({
          ...prev,
          loaded: new Set([...prev.loaded, src]),
          loading: new Set([...prev.loading].filter(s => s !== src))
        }));
        resolve();
      };
      
      img.onerror = () => {
        setState(prev => ({
          ...prev,
          failed: new Set([...prev.failed, src]),
          loading: new Set([...prev.loading].filter(s => s !== src))
        }));
        reject(new Error(`Failed to load: ${src}`));
      };
      
      img.src = src;
    });
  }, [state.loaded, state.loading]);

  // Preload critical GIFs immediately
  useEffect(() => {
    if (criticalGifs.length === 0) return;

    const loadCritical = async () => {
      // Check if we should reduce data usage
      const connection = (navigator as any).connection;
      const shouldReduceData = connection?.saveData || connection?.effectiveType === 'slow-2g';
      
      if (shouldReduceData) {
        // On slow connections, only load first 2 critical GIFs
        const limitedGifs = criticalGifs.slice(0, 2);
        await Promise.allSettled(limitedGifs.map(preloadGif));
      } else {
        // Preload all critical GIFs in parallel
        await Promise.allSettled(criticalGifs.map(preloadGif));
      }
    };

    // Small delay to not block initial render
    const timer = setTimeout(loadCritical, delay);
    return () => clearTimeout(timer);
  }, [criticalGifs, delay, preloadGif]);

  // Queue secondary GIFs after critical are loaded
  useEffect(() => {
    if (secondaryGifs.length === 0) return;
    
    // Wait for critical GIFs to load first
    const criticalLoaded = criticalGifs.every(gif => state.loaded.has(gif));
    if (!criticalLoaded && criticalGifs.length > 0) return;

    const loadSecondary = async () => {
      // Load in batches to not overwhelm the browser
      for (let i = 0; i < secondaryGifs.length; i += concurrent) {
        const batch = secondaryGifs.slice(i, i + concurrent);
        await Promise.allSettled(batch.map(preloadGif));
        
        // Update progress
        setProgress(Math.round(((i + batch.length) / secondaryGifs.length) * 100));
        
        // Small delay between batches
        await new Promise(r => setTimeout(r, 50));
      }
    };

    const timer = setTimeout(loadSecondary, 500);
    return () => clearTimeout(timer);
  }, [secondaryGifs, criticalGifs, concurrent, state.loaded, preloadGif]);

  return {
    isLoaded: (src: string) => state.loaded.has(src),
    isLoading: (src: string) => state.loading.has(src),
    hasFailed: (src: string) => state.failed.has(src),
    loadedCount: state.loaded.size,
    progress,
    preloadGif
  };
}

/**
 * Preload a single GIF with priority
 */
export function preloadGifImmediate(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
}

/**
 * Get optimized GIF loading attributes based on position
 */
export function getGifLoadingAttrs(index: number, total: number) {
  // First 2 items are priority
  if (index < 2) {
    return {
      loading: 'eager' as const,
      decoding: 'sync' as const,
      priority: true
    };
  }
  
  // Next 2 items load async but not lazy
  if (index < 4) {
    return {
      loading: 'eager' as const,
      decoding: 'async' as const,
      priority: false
    };
  }
  
  // Rest are lazy loaded
  return {
    loading: 'lazy' as const,
    decoding: 'async' as const,
    priority: false
  };
}

export default useGifPreloader;



