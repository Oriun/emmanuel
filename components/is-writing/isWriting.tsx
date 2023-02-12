import React from "react";
import Emoji, { EmojiAnimation } from "../emoji";

export type IsWritingProps = {
  className?: string;
  name: string;
  skippable?: boolean;
};

const IsWriting: React.FC<IsWritingProps> = ({
  className,
  name,
  skippable,
}) => {
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
      {skippable && (
        <span style={{ marginLeft: 12 }}>
          Press <b>space</b> to skip
        </span>
      )}
    </span>
  );
};

export default IsWriting;
