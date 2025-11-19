import { useTheme } from "./hooks/useTheme";

export function ToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary hover:btn-neutral rounded-lg py-2 px-2.5 border-0"
    >
      <img
        src={
          isDark ? "assets/images/icon-sun.svg" : "assets/images/icon-moon.svg"
        }
        alt={isDark ? "Light Mode" : "Dark Mode"}
        className="w-4 h-4"
      />
    </button>
  );
}
