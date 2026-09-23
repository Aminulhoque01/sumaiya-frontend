"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
 

const navItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleScroll = (href: string) => {
    setOpen(false);

    const element = document.querySelector(href);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="container-main pt-4 md:pt-6">
        {/* MAIN NAVBAR */}
        <nav
          className="
            relative
            flex
            h-[68px]
            items-center
            justify-between
            rounded-full
            border
            border-[var(--border)]
            bg-[color-mix(in_srgb,var(--background)_82%,transparent)]
            px-2
            pl-3
            shadow-[0_10px_50px_rgba(0,0,0,0.04)]
            backdrop-blur-2xl
            transition-all
            duration-500
            dark:shadow-[0_10px_50px_rgba(0,0,0,0.28)]
            md:h-[72px]
            md:pl-4
          "
        >
          {/* BRAND */}
          <button
            type="button"
            onClick={() => handleScroll("#home")}
            className="
              group
              flex
              items-center
              gap-3
              outline-none
            "
          >
            {/* LOGO MARK */}
            <span
              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-[var(--foreground)]
                text-[var(--background)]
                transition-transform
                duration-500
                group-hover:rotate-[-8deg]
                group-hover:scale-105
              "
            >
              <span
                className="
                  relative
                  z-10
                  text-[15px]
                  font-semibold
                  tracking-[-0.08em]
                "
              >
                SH
              </span>

              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  h-7
                  w-7
                  rounded-full
                  border
                  border-[var(--background)]/20
                "
              />
            </span>

            {/* BRAND TEXT */}
            <span className="hidden text-left sm:block">
              <span
                className="
                  block
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--foreground)]
                "
              >
                Sumaiya Haque
              </span>

              <span
                className="
                  mt-0.5
                  block
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-[var(--muted)]
                "
              >
                Graphic Designer
              </span>
            </span>
          </button>

          {/* DESKTOP NAV */}
          <div
            className="
              absolute
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-0.5
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--card)]/55
              p-1
              backdrop-blur-xl
              md:flex
            "
          >
            {navItems.map((item, index) => (
              <button
                key={item.href}
                type="button"
                onClick={() =>
                  handleScroll(item.href)
                }
                className="
                  group
                  relative
                  rounded-full
                  px-4
                  py-2.5
                  text-[11px]
                  font-medium
                  tracking-[0.01em]
                  text-[var(--muted)]
                  transition-all
                  duration-300
                  hover:bg-[var(--foreground)]/[0.05]
                  hover:text-[var(--foreground)]
                "
              >
                <span className="relative z-10">
                  {item.label}
                </span>

                {index === 0 && (
                  <span
                    className="
                      absolute
                      bottom-1.5
                      left-1/2
                      h-[2px]
                      w-1
                      -translate-x-1/2
                      rounded-full
                      bg-[var(--foreground)]
                      opacity-50
                    "
                  />
                )}
              </button>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            {/* DESKTOP CTA */}
            <button
              type="button"
              onClick={() =>
                handleScroll("#contact")
              }
              className="
                group
                hidden
                h-11
                items-center
                gap-2
                rounded-full
                bg-[var(--foreground)]
                px-5
                text-[11px]
                font-semibold
                tracking-[0.02em]
                text-[var(--background)]
                transition-all
                duration-500
                hover:gap-3
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                md:flex
              "
            >
              Start a project

              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </button>

            {/* THEME */}
            <ThemeToggle />

            {/* MOBILE MENU */}
            <button
              type="button"
              onClick={() =>
                setOpen((prev) => !prev)
              }
              aria-label={
                open
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
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
                text-[var(--foreground)]
                transition-all
                duration-300
                hover:border-[var(--border-strong)]
                md:hidden
              "
            >
              {open ? (
                <X
                  size={18}
                  strokeWidth={1.8}
                />
              ) : (
                <Menu
                  size={18}
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            md:hidden
            ${
              open
                ? "mt-2 max-h-[500px] opacity-100"
                : "pointer-events-none max-h-0 opacity-0"
            }
          `}
        >
          <div
            className="
              rounded-[2rem]
              border
              border-[var(--border)]
              bg-[color-mix(in_srgb,var(--background)_94%,transparent)]
              p-5
              shadow-[0_20px_70px_rgba(0,0,0,0.07)]
              backdrop-blur-2xl
              dark:shadow-[0_20px_70px_rgba(0,0,0,0.3)]
            "
          >
            {/* MOBILE NAV ITEMS */}
            <div className="divide-y divide-[var(--border)]">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() =>
                    handleScroll(item.href)
                  }
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    py-4
                    text-left
                    transition-colors
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      gap-3
                      text-[var(--foreground)]
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        tracking-[0.15em]
                        text-[var(--subtle)]
                      "
                    >
                      0{index + 1}
                    </span>

                    <span
                      className="
                        text-lg
                        font-medium
                        tracking-[-0.03em]
                      "
                    >
                      {item.label}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="
                      text-[var(--muted)]
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </button>
              ))}
            </div>

            {/* MOBILE CTA */}
            <button
              type="button"
              onClick={() =>
                handleScroll("#contact")
              }
              className="
                group
                mt-5
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                bg-[var(--foreground)]
                px-5
                py-4
                text-sm
                font-medium
                text-[var(--background)]
                transition-all
                duration-300
                hover:scale-[1.01]
              "
            >
              <span>
                Start a project
              </span>

              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}