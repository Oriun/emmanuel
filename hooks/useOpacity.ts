import React from "react";

export default function useOpacity() {
  const [opacity, setOpacity] = React.useState("1");
  const ref = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOpacity((entry.intersectionRatio ** 2).toFixed(2));
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i / 100) }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [opacity]);
  return [opacity, ref] as const;
}
