export default function wave(element: HTMLElement) {
  const frames = new KeyframeEffect(
    element,
    [
      { offset: 0, transform: "none" },
      {
        offset: 0.18,
        transform: "translate3d(-20%, 0px, 0px) rotate3d(0, 0, 1, -10deg)",
      },
      {
        offset: 0.36,
        transform: "translate3d(10%, 0px, 0px) rotate3d(0, 0, 1, 7deg)",
      },
      {
        offset: 0.54,
        transform: "translate3d(-15%, 0px, 0px) rotate3d(0, 0, 1, -10deg)",
      },
      {
        offset: 0.72,
        transform: "translate3d(10%, 0px, 0px) rotate3d(0, 0, 1, 5deg)",
      },
      {
        offset: 0.9,
        transform: "translate3d(-5%, 0px, 0px) rotate3d(0, 0, 1, -2deg)",
      },
    ],
    {
      duration: 900,
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
