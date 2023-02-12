import type { EmojiFunctionOptions } from ".";

export default function wave(
  element: HTMLElement,
  options: EmojiFunctionOptions = {}
) {
  const maxDist = 4 * (options.amplitude || 1);
  const frames = new KeyframeEffect(
    element,
    [
      { offset: 0, transform: `translateY(-${maxDist * 0.1}px)` },
      {
        offset: 0.2,
        transform: `translateY(${maxDist * 0.8}px)`,
      },
      {
        offset: 0.28,
        transform: `translateY(${maxDist}px)`,
      },
      {
        offset: 0.38,
        transform: `translateY(${maxDist * 0.8}px)`,
      },
      {
        offset: 0.68,
        transform: `translateY(-${maxDist * 0.8}px)`,
      },
      {
        offset: 0.76,
        transform: `translateY(-${maxDist}px)`,
      },
      {
        offset: 0.84,
        transform: `translateY(-${maxDist * 0.8}px)`,
      },
      {
        offset: 1,
        transform: `translateY(-${maxDist * 0.1}px)`,
      },
    ],
    {
      duration: 1_800 / (options.speed || 1),
      easing: "linear",
      fill: "both",
      iterations: 2,
    }
  );
  const animation = new Animation(frames, document.timeline);
  return {
    play() {
      animation.cancel();
      animation.play();
    },
    loop() {
      animation.effect!.updateTiming({
        iterations: Infinity,
      });
      animation.play();
      animation.onfinish = () => animation.play();
    },
    cancel() {
      animation.cancel();
      animation.effect!.updateTiming({
        iterations: 2,
      });
    },
  };
}
