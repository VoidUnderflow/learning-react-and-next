import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("my-dark-theme");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "my-dark-theme") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "my-light-theme" ? "my-dark-theme" : "my-light-theme");
  }

  const isDark = theme === "my-dark-theme";

  return { theme, isDark, toggleTheme };
}
