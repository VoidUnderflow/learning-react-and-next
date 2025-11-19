import React from "react";
import clsx from "clsx";
import IconCheck from "../assets/icons/icon-check.svg?react";

interface CheckboxProps {
  checked: boolean;
  onToggle: (id: number) => void;
  id: number;
}

export default function Checkbox({ checked, onToggle, id }: CheckboxProps) {
  // Handle click directly to prevent propagation issues with drag and drop
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id);
  };

  return (
    <div
      className="group relative inline-block cursor-pointer"
      onClick={handleClick}
    >
      {/* Outer element - border effect */}
      <div
        className={clsx(
          "relative flex items-center justify-center w-8 h-8 rounded-full p-0.5",
          {
            "bg-gradient-to-br from-check-start to-check-end": checked,
            "bg-inactiveColor": !checked,
            "group-hover:bg-gradient-to-br group-hover:from-check-start group-hover:to-check-end":
              !checked,
          }
        )}
      >
        {/* Inner element - the circle within the border */}
        <div
          className={clsx(
            "absolute inset-0.5 rounded-full flex items-center justify-center",
            {
              // When checked: full gradient
              "bg-gradient-to-br from-check-start to-check-end": checked,
              // When unchecked: same color as the todo-background.
              "bg-todo-bgColor": !checked,
            }
          )}
        >
          {/* Checkmark icon */}
          {checked && <IconCheck className=" text-white" />}
        </div>
      </div>
    </div>
  );
}
