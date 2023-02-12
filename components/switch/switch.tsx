import React from "react";
import styles from "./switch.module.scss";
import font from "@/styles/font.module.scss";
import cx from "clsx";
import useSize from "@/hooks/useSize";
import mergeRef from "@/utils/mergeRef";

export type SwitchTab = {
  key: string;
  content: React.ReactNode | React.ReactNode[];
};

export type SwitchProps = {
  className?: string | Record<string, boolean>;
  style: React.CSSProperties;
  tabs: SwitchTab[];
  setActiveTab: (key: string) => void;
  activeTab: string;
};

const Switch: React.ForwardRefRenderFunction<HTMLDivElement, SwitchProps> = (
  { className, tabs, setActiveTab, activeTab, style },
  externalRef
) => {
  const [size, ref] = useSize();
  const activeIndex = Math.max(
    tabs.findIndex((tab) => tab.key === activeTab),
    0
  );
  const activeTabStyle = {
    width: `calc((${size.width}px - (2 * var(--padding))) / ${tabs.length})`,
    transform: `translateX(${100 * activeIndex}%)`,
  };

  return (
    <div
      className={cx(styles.switch_container, className)}
      ref={mergeRef(ref, externalRef)}
      style={style}
    >
      <div className={styles.switch_selected} style={activeTabStyle} />
      <div className={styles.switch_tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={cx(styles.switch_tab, font.title)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export function useSwitch(tabs: SwitchTab[]) {
  const [activeTab, setActiveTab] = React.useState(tabs[0].key);
  return {
    activeTab,
    setActiveTab,
    tabs,
  };
}

export default React.forwardRef(Switch);
