/* eslint-disable react/prop-types */
import { useState } from "react";
import { DisplayState } from "../data/DisplayState";

export default function Card({ card, displayState, removeSelf }) {
  const [isActive, setIsActive] = useState(true);

  if (
    (displayState === DisplayState.active && !isActive) ||
    (displayState === DisplayState.inactive && isActive)
  ) {
    return null;
  }

  return (
    <div className="single-card">
      <div className="flex space-x-4">
        <img className="w-16 h-16" src={card.logo} alt={card.name} />
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg">{card.name}</h3>
          <p className="text-sm w-3/4 max-h-20 overflow-hidden text-ellipsis">
            {card.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => removeSelf()}
          className="remove-button"
        >
          Remove
        </button>

        {/* Plain-Tailwind toggle, thumb as sibling */}
        <label className="relative inline-flex items-center cursor-pointer ml-4">
          {/* Hidden checkbox */}
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="sr-only peer"
          />

          {/* Track */}
          <div className="toggle-track" />

          {/* Thumb */}
          <div className="toggle-thumb" />
        </label>
      </div>
    </div>
  );
}
