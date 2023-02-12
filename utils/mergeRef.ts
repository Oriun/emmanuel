import React from "react";

export default function mergeRef<T extends HTMLElement>(
  ...refs: Array<React.Ref<T>>
) {
  const ref: React.RefCallback<T> = (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref !== null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
  return ref;
}
