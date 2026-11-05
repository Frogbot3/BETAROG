"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
export function ThemeControl() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const light = mounted && theme === "light";
  return (
    <button
      className="theme-control"
      onClick={() => setTheme(light ? "dark" : "light")}
      aria-label={`Switch to ${light ? "dark" : "light"} theme`}
    >
      <Sun size={16} />
      <span className={`theme-track ${light ? "is-light" : ""}`}>
        <i />
      </span>
      <Moon size={15} />
    </button>
  );
}
