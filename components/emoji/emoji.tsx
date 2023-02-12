import React, { DOMAttributes, HTMLAttributes } from "react";
import cx from "clsx";
import styles from "./emoji.module.scss";
import Animations, { EmojiAnimation, EmojiFunction } from "./fn";

export type EmojiProps = {
  content: string;
  loop?: boolean;
  event?: "onClick" | "onMouseEnter" | "onMouseLeave" | "whileHover";
  animation: EmojiAnimation;
  className?: string;
  playOnRender?: boolean;
  delay?: number;
  speed?: number;
  amplitude?: number;
};

const Emoji: React.FC<EmojiProps> = ({
  content,
  className,
  animation,
  event,
  loop,
  playOnRender,
  delay = 0,
  speed = 1,
  amplitude = 1,
}) => {
  const animationFunction = Animations[animation];
  const animationRef = React.useRef<ReturnType<EmojiFunction> | null>(null);
  const ref = React.useRef<HTMLSpanElement>(null);
  const [interactions, setInteractions] = React.useState<
    HTMLAttributes<HTMLSpanElement>
  >({});
  React.useEffect(() => {
    if (animationRef.current) {
      animationRef.current.cancel();
    }
    if (ref.current) {
      const selectedAnimation = animationFunction(ref.current, {
        speed,
        amplitude,
      });
      animationRef.current = selectedAnimation;
      const playMode = loop ? "loop" : "play";
      if (event) {
        if (event === "whileHover") {
          setInteractions({
            onMouseEnter: () => selectedAnimation[playMode](),
            onMouseLeave: () => selectedAnimation.cancel(),
          });
        } else {
          setInteractions({
            [event]: () => selectedAnimation[playMode](),
            style: { cursor: "pointer" },
          });
        }
        if (playOnRender) setTimeout(() => selectedAnimation.play(), delay);
      } else {
        console.log("playMode", playMode);
        setTimeout(() => selectedAnimation[playMode](), delay);
        setInteractions({});
      }
    }
  }, [event, loop, animationFunction, playOnRender, ref]);

  return (
    <span {...interactions} className={cx(styles.emoji, className)} ref={ref}>
      {content}
    </span>
  );
};

export default Emoji;
