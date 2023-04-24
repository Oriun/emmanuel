import Button from "@/components/button";
import Emoji, { EmojiAnimation } from "@/components/emoji";
import React from "react";
import styles from "../home.module.scss";
import font from "@/styles/font.module.scss";
import cx from "clsx";

export const messagesElements = [
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
    onClick={() => {
      window.scrollBy({ behavior: "smooth", top: window.innerHeight });
    }}
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

export const messagesDelays = [300, 2_500, 3_000, 4_000, 3_000];
