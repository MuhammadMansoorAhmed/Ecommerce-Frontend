import { useCallback } from "react";

export default function usePerformance() {
  const measureComponentRender = useCallback((componentName) => {
    const start = performance.now();

    return () => {
      const end = performance.now();
      const duration = end - start;
      // Swap this for your analytics pipeline if needed
      console.log(
        `[Performance] ${componentName} rendered in ${duration.toFixed(2)}ms`
      );
    };
  }, []);

  return { measureComponentRender };
}
