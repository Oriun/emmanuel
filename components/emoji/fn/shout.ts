import { EmojiFunctionOptions } from ".";

export default function wave(
  element: HTMLElement,
  options?: EmojiFunctionOptions
) {
  const scale = 1.2 * (options?.amplitude || 1);
  const frames = new KeyframeEffect(
    element,
    [
      { offset: 0, transform: "none" },
      {
        offset: 0.1,
        transform: `scale(${scale}) translate3d(-20%, 0px, 0px) rotate3d(0, 0, 1, -10deg)`,
      },
      {
        offset: 0.2,
        transform: `scale(${scale}) translate3d(10%, 0px, 0px) rotate3d(0, 0, 1, 10deg)`,
      },
      {
        offset: 0.3,
        transform: `scale(${scale}) translate3d(-17%, 0px, 0px) rotate3d(0, 0, 1, -8deg)`,
      },
      {
        offset: 0.4,
        transform: `scale(${scale}) translate3d(10%, 0px, 0px) rotate3d(0, 0, 1, 10deg)`,
      },
      {
        offset: 0.5,
        transform: `scale(${scale}) translate3d(-14%, 0px, 0px) rotate3d(0, 0, 1, -6deg)`,
      },
      {
        offset: 0.6,
        transform: `scale(${scale}) translate3d(10%, 0px, 0px) rotate3d(0, 0, 1, 10deg)`,
      },
      {
        offset: 0.7,
        transform: `scale(${scale}) translate3d(-11%, 0px, 0px) rotate3d(0, 0, 1, -4deg)`,
      },
      {
        offset: 0.8,
        transform: `scale(${scale}) translate3d(10%, 0px, 0px) rotate3d(0, 0, 1, 10deg)`,
      },
      {
        offset: 0.9,
        transform: `scale(${scale}) translate3d(0%, 0px, 0px) rotate3d(0, 0, 1, 0deg)`,
      },
    ],
    {
      duration: 900 / (options?.speed || 1),
      endDelay: 1_000 / (options?.speed || 1),
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
