import React from "react";

export type Size = {
  width: number;
  height: number;
};

export default function useSize() {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  const ref = React.useCallback(
    (node: HTMLElement) => {
      function diff(a: Size, b: Size) {
        return a.width !== b.width || a.height !== b.height;
      }
      if (node !== null) {
        const nodeSize = { width: node.offsetWidth, height: node.offsetHeight };
        if (node.offsetWidth === 0 && node.offsetHeight === 0) {
          const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
              if (diff(size, entry.contentRect))
                setSize({
                  width: entry.contentRect.width,
                  height: entry.contentRect.height,
                });
            }
          });
          observer.observe(node);
          return () => observer.disconnect();
        } else if (diff(size, nodeSize))
          setSize({ width: node.offsetWidth, height: node.offsetHeight });
      }
    },
    [size]
  ) as React.RefCallback<HTMLElement>;
  return [size, ref] as const;
}
