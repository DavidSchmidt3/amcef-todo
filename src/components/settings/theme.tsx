import { useTheme } from "@/hooks/theme";
import { Button } from "@headlessui/react";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-center p-4">
      <Button
        onClick={() => toggleTheme()}
        className="px-4 py-2 text-sm rounded bg-primary"
      >
        Switch to {theme === "light" ? "dark" : "light"} theme
      </Button>
    </div>
  );
}
