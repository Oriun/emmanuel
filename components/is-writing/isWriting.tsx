import React from "react";
import Emoji, { EmojiAnimation } from "../emoji";

export type IsWritingProps = {
  className?: string;
  name: string;
};

const IsWriting: React.FC<IsWritingProps> = ({ className, name }) => {
  return (
    <span className={className}>
      <b>{name}</b> is writing{" "}
      <Emoji
        content="•"
        animation={EmojiAnimation.float}
        loop
        playOnRender
        amplitude={0.5}
        speed={1.4}
      />
      <Emoji
        content="•"
        animation={EmojiAnimation.float}
        loop
        playOnRender
        delay={250}
        amplitude={0.5}
        speed={1.4}
      />
      <Emoji
        content="•"
        animation={EmojiAnimation.float}
        loop
        playOnRender
        delay={500}
        amplitude={0.5}
        speed={1.4}
      />
    </span>
  );
};

export default IsWriting;
