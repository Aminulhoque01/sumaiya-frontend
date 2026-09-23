"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[var(--border)]
          bg-[var(--card)]
        "
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        group
        relative
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--card)]
        text-[var(--foreground)]
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        transition-all
        duration-500
        hover:scale-105
        hover:border-[var(--border-strong)]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
      "
    >
      <Sun
        size={17}
        strokeWidth={1.8}
        className={`
          absolute
          transition-all
          duration-500
          ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }
        `}
      />

      <Moon
        size={17}
        strokeWidth={1.8}
        className={`
          absolute
          transition-all
          duration-500
          ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }
        `}
      />

      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-full
          bg-[var(--foreground)]
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-[0.04]
          dark:group-hover:opacity-[0.06]
        "
      />
    </button>
  );
}