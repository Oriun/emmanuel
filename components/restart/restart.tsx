import Restart from "@/assets/restart";
import React from "react";
import Emoji, { EmojiAnimation } from "../emoji";
import styles from "./restart.module.scss";
import cx from "clsx";

export type RestartButtonProps = {
  className?: string | Record<string, boolean>;
};

const RestartButton: React.FC<RestartButtonProps> = ({ className }) => {
  return (
    <div
      className={cx(styles.restart, className)}
      onClick={() => {
        window.location.reload();
      }}
    >
      <Emoji
        animation={EmojiAnimation.rotate}
        content={<Restart />}
        event="whileHover"
        className={styles.restart_icon}
      />
      <span className={styles.restart_text}>Redémarrer</span>
    </div>
  );
};

export default RestartButton;
