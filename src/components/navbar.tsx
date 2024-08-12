import { useTheme } from "@/hooks/theme";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  useTheme();

  return (
    <header className="flex justify-between w-full p-4 border-b">
      <nav className="flex gap-4 px-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/settings" className="[&.active]:font-bold">
          Settings
        </Link>
      </nav>
    </header>
  );
}
