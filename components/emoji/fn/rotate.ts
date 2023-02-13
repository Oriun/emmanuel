export default function wave(element: HTMLElement) {
  const frames = new KeyframeEffect(
    element,
    [
      { transform: "rotate(0deg)" },
      {
        transform: "rotate(-360deg)",
      },
    ],
    {
      duration: 600,
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
