import Emoji, { EmojiAnimation } from "@/components/emoji";
import IsWriting from "@/components/is-writing";
import React, { useCallback } from "react";
import cx from "clsx";
import font from "@/styles/font.module.scss";
import styles from "../home.module.scss";
import Button from "@/components/button";
import useOpacity from "@/hooks/useOpacity";
import useSize from "@/hooks/useSize";
import mergeRef from "@/utils/mergeRef";
import { messagesElements, messagesDelays } from "./hero-messages";

const Hero = () => {
  const [index, setIndex] = React.useState(0);
  const [isWriting, setIsWriting] = React.useState(true);
  const [messages, setMessages] = React.useState<typeof messagesElements>([]);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [opacity, opacityRef] = useOpacity();
  const lastMessage = React.useRef<HTMLElement>(null);
  const [{ height }, sizeRef] = useSize();

  const next = React.useCallback(() => {
    setMessages((prev) => [messagesElements[index], ...prev]);
    setIndex((prev) => prev + 1);
    setHasEnded(false);
  }, [index]);

  React.useEffect(() => {
    if (index === messagesElements.length) return;
    const timeout = setTimeout(next, messagesDelays[index]);
    return () => clearTimeout(timeout);
  }, [index, next]);

  React.useEffect(() => {
    if (index === messagesElements.length || parseFloat(opacity) <= 0.9) return;
    function skip(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    }
    window.addEventListener("keydown", skip, {
      once: true,
      capture: true,
    });
    return () => window.removeEventListener("keydown", skip, { capture: true });
  }, [index, opacity, next]);

  React.useEffect(() => {
    if (index >= messagesElements.length - 2) {
      const timeout = setTimeout(() => {
        setIsWriting(false);
      }, (messagesDelays[index] ?? 200) - 200);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  React.useEffect(() => {
    if (lastMessage.current) {
      const message = lastMessage.current;
      const height = message.clientHeight;
      const ratio = height / 64;
      // a + b = 1
      // a / b = ratio
      //
      // a = ratio * b
      // a = 1 - b
      //
      // ratio * b = 1 - b
      // ratio * b + b = 1
      // (ratio + 1) * b = 1
      // b = 1 / (ratio + 1)
      const offset = 1 / (ratio + 1);
      const animation = message.parentElement!.animate(
        [
          { height: 0, marginTop: -64, offset: 0 },
          { height: 0, marginTop: 0, offset },
          { height, marginTop: 0, offset: 1 },
        ],
        {
          duration: 400,
          fill: "forwards",
          easing: "ease-in-out",
        }
      );
      animation.onfinish = () => {
        setHasEnded(true);
      };
      return () => animation.cancel();
    }
  }, [messages]);

  return (
    <article
      ref={mergeRef(opacityRef, sizeRef)}
      className={styles.hero}
      style={{
        maskImage: `-webkit-gradient(linear, center top, center bottom, color-stop(0, #0000), color-stop(${(
          150 /*px*/ / height
        ).toFixed(2)}, #000f))`,
        opacity,
      }}
    >
      <div className={styles.hero_content}>
        {messages.length ? (
          <div key={messages[0].key} className={cx(!hasEnded && styles.last)}>
            {React.cloneElement(messages[0], {
              ref: lastMessage,
            })}
          </div>
        ) : null}
        {messages.slice(1)}

        {isWriting ? (
          <IsWriting className={styles.writing} name="Emmanuel" skippable />
        ) : null}
      </div>
    </article>
  );
};

export default Hero;
