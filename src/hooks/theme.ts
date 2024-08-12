import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const THEME_KEY = `theme.${import.meta.env.VITE_VERCEL_URL}`;
const DEFAULT_THEME = "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(THEME_KEY) as Theme) ?? DEFAULT_THEME
  );

  useEffect(() => {
    const localTheme = localStorage.getItem(THEME_KEY) as Theme;
    handleChangeTheme(localTheme ?? DEFAULT_THEME);
  }, []);

  function handleChangeTheme(newTheme: Theme) {
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    handleChangeTheme(newTheme);
  }

  return { theme, toggleTheme };
};
