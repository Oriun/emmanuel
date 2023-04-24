import { EmojiFunctionOptions } from ".";

export default function wave(
  element: HTMLElement,
  options?: EmojiFunctionOptions
) {
  const loops = options?.amplitude ?? 1;
  const frames = new KeyframeEffect(
    element,
    [
      { transform: "rotate(0deg)" },
      {
        transform: `rotate(${-360 * loops}deg)`,
      },
    ],
    {
      duration: 600 * loops,
      // easing: "ease",
      endDelay: 1_000,
    }
  );
  const animation = new Animation(frames, document.timeline);
  return {
    play() {
      animation.cancel();
      animation.play();
    },
    loop() {
      animation.play();
      animation.onfinish = () => animation.play();
    },
    cancel() {
      animation.cancel();
    },
  };
}
