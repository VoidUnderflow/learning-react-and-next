import { useEffect, useState } from "react";
import IconMoon from "../assets/icons/icon-moon.svg?react";
import IconSun from "../assets/icons/icon-sun.svg?react";

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      return stored === "dark";
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  return (
    <button className="cursor-pointer" onClick={toggleTheme}>
      {isDark ? <IconSun /> : <IconMoon />}
    </button>
  );
}
