import { useTheme } from "@/hooks/theme";
import { Button } from "@headlessui/react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between w-full p-4 border-b">
      <Button
        onClick={() => toggleTheme()}
        className="px-4 py-2 text-sm rounded bg-primary"
      >
        Prepnúť na {theme === "light" ? "tmavú" : "svetlú"} tému
      </Button>
    </header>
  );
}
