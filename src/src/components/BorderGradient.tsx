import clsx from "clsx";
import { ReactNode } from "react";

function BorderGradient({
  children,
  className,
  As = "div",
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  As?: "div" | "button";
  onClick?: () => void;
}) {
  return (
    <As
      className={clsx(className, "gradient bg-gradient-to-r bg-pos-0")}
      onClick={onClick}
    >
      {children}
    </As>
  );
}

export default BorderGradient;
