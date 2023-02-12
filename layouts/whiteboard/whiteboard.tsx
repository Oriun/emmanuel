import React from "react";
import styles from "./whiteboard.module.scss";
import cx from "clsx";
import Switch, { useSwitch } from "@/components/switch";
import useSize from "@/hooks/useSize";

export type WhiteboardProps = {
  className?: string | Record<string, boolean>;
  children?: React.ReactNode | React.ReactNode[];
};

const Whiteboard: React.FC<WhiteboardProps> = ({ className, children }) => {
  const [fixed, setFixed] = React.useState(true);
  const stopMarkRef = React.useRef<HTMLDivElement>(null);
  const [switchSize, switchRef] = useSize();
  const { activeTab, setActiveTab, tabs } = useSwitch([
    { key: "work", content: "Work" },
    { key: "story", content: "Story" },
  ]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.intersectionRatio !== 0;
      const isAbove = entry.boundingClientRect.top < 0;
      const shouldBeFixed = !isVisible && !isAbove;
      if (shouldBeFixed !== fixed) setFixed(shouldBeFixed);
    });
    if (stopMarkRef.current) {
      observer.observe(stopMarkRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [fixed]);

  return (
    <section className={cx(styles.container, className)}>
      <Switch
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        className={cx(styles.control, styles.top_control, styles.nav)}
        ref={switchRef}
        style={{
          left: `calc(50vw - ${switchSize.width / 2}px)`,
        }}
      />
      {children}
      <div
        className={cx(
          styles.bottom_controls,
          styles.control,
          fixed && styles.fixed
        )}
      >
        Controls
      </div>
      <div className={styles.stop_mark} ref={stopMarkRef} />
    </section>
  );
};

export default Whiteboard;
