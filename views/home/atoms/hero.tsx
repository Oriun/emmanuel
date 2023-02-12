import Emoji, { EmojiAnimation } from "@/components/emoji";
import IsWriting from "@/components/is-writing";
import React from "react";
import cx from "clsx";
import font from "@/styles/font.module.scss";
import styles from "../home.module.scss";
import Button from "@/components/button";
const messagesElements = [
  <p className={font.big_title} key="first">
    Salut !{" "}
    <Emoji
      content="👋"
      animation={EmojiAnimation.wave}
      event="whileHover"
      loop
      playOnRender
      delay={1_000}
    />
  </p>,
  <h1 className={cx(font.big_title, styles.text)} key="second">
    Je m&apos;appelle <b>Emmanuel</b>, je suis un développeur fullstack basé à
    Nice.
  </h1>,
  <p className={cx(font.big_title, styles.text)} key="third">
    Je réalise (et parfois{" "}
    <span className={font.unbreakable}>
      design{" "}
      <Emoji
        content="✨"
        animation={EmojiAnimation.float}
        event="whileHover"
        loop
        playOnRender
      />
      )
    </span>{" "}
    des expériences utilisateurs mémorables et des architectures robustes.
  </p>,
  <p className={font.big_title} key="fourth">
    Bienvenue dans mon <s>portfolio</s> terrain de jeu{" "}
    <Emoji
      content="👑"
      animation={EmojiAnimation.shout}
      event="whileHover"
      loop
      playOnRender
      delay={1_000}
      speed={0.8}
    />
    .
  </p>,
  <Button
    key="fifth"
    onClick={() =>
      window.scrollBy({ behavior: "smooth", top: window.innerHeight })
    }
  >
    Voir mon travail
    <Emoji
      content="👇"
      animation={EmojiAnimation.float}
      loop
      playOnRender
      className={styles.button_emoji}
    />
  </Button>,
];

const delays = [300, 2_500, 3_000, 4_000, 3_000];

const Hero = () => {
  const [index, setIndex] = React.useState(0);
  const [isWriting, setIsWriting] = React.useState(true);
  const [messages, setMessages] = React.useState<typeof messagesElements>([]);
  const [opacity, setOpacity] = React.useState("1");
  const [hasEnded, setHasEnded] = React.useState(false);
  const lastMessage = React.useRef<HTMLElement>(null);
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOpacity((entry.intersectionRatio ** 2).toFixed(2));
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i / 100) }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [opacity]);

  React.useEffect(() => {
    if (index === messagesElements.length) return;
    const timeout = setTimeout(() => {
      setMessages((prev) => [messagesElements[index], ...prev]);
      setIndex((prev) => prev + 1);
      setHasEnded(false);
    }, delays[index]);
    return () => clearTimeout(timeout);
  }, [index]);

  React.useEffect(() => {
    if (index >= messagesElements.length - 2) {
      const timeout = setTimeout(() => {
        setIsWriting(false);
      }, (delays[index] ?? 200) - 200);
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

  React.useEffect(() => {
    if (index === messagesElements.length || parseFloat(opacity) <= 0.9) return;
    function skip(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        setMessages((prev) => [messagesElements[index], ...prev]);
        setIndex((prev) => prev + 1);
        setHasEnded(false);
        return false;
      }
    }
    window.addEventListener("keydown", skip, {
      once: true,
      capture: true,
    });
    return () => window.removeEventListener("keydown", skip, { capture: true });
  }, [index, opacity]);

  const blocHeight = "window" in global ? window.innerHeight : 1_080;

  return (
    <article
      ref={heroRef}
      className={styles.hero}
      style={{
        maskImage: `-webkit-gradient(linear, center top, center bottom, color-stop(0, #0000), color-stop(${(
          150 /*px*/ / blocHeight
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
        {opacity}
      </div>
    </article>
  );
};

export default Hero;
