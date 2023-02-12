import React from "react";
import styles from "./button.module.scss";
import cx from "clsx";

export type ButtonProps = {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  link?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
};
const Button: React.ForwardRefRenderFunction<
  HTMLAnchorElement & HTMLButtonElement,
  ButtonProps
> = (
  {
    link,
    children,
    onClick,
    disabled = false,
    className,
    style,
    type = "button",
  },
  ref
) => {
  const Component = React.useMemo(() => {
    if (link) {
      return "a";
    }
    return "button";
  }, [link]);
  return (
    <Component
      className={cx(styles.button, className)}
      style={style}
      href={link}
      onClick={onClick}
      disabled={disabled}
      type={type}
      ref={ref}
    >
      {children}
    </Component>
  );
};

export default React.forwardRef(Button);
