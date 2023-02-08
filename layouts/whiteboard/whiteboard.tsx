import React from "react";
import styles from "./whiteboard.module.scss";
import cx from "clsx";

export type WhiteboardProps = {
  className?: string | Record<string, boolean>;
};

const Whiteboard: React.FC<WhiteboardProps> = ({ className }) => {
  return (
    <section className={cx(styles.container, className)}>
      <div className={styles.bottom_controls}>Controls</div>
    </section>
  );
};

export default Whiteboard;
