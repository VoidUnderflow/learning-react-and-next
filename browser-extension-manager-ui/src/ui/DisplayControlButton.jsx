/* eslint-disable react/prop-types */
import clsx from "clsx";

export function DisplayControlButton({ children, active, onClick }) {
  return (
    <button
      type="button"
      className={clsx(
        "rounded-full border-1 px-4 py-2 shadow-md",
        !active &&
          "bg-secondary border-secondary hover:bg-neutral hover:border-neutral",
        active &&
          "bg-accent text-primary border-accent hover:bg-red-500 hover:border-accent"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
