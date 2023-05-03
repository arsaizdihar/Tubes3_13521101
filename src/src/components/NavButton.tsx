import clsx from "clsx";
import React from "react";

function NavButton({
  icon,
  text,
  onClick,
  isActive,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative flex cursor-pointer items-center gap-3 break-all rounded-md px-3 py-3 text-gray-100 hover:bg-[#2A2B32] hover:pr-4",
        isActive && "bg-[#2A2B32]"
      )}
    >
      {icon}
      <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all text-left">
        {text}
      </div>
    </button>
  );
}

export default NavButton;
