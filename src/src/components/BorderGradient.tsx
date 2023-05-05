import { ReactNode } from "react";

function BorderGradient({
  from,
  to,
  children,
  className,
}: {
  from: string;
  to: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
      className={className}
    >
      {children}
    </div>
  );
}

export default BorderGradient;
