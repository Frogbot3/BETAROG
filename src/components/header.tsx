"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/lib/site";
import { Logo } from "./ui";

export function Header() {
  const path = usePathname();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    navigation.forEach(({ section }) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [path]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = panel.current?.querySelectorAll<HTMLAnchorElement>("a");
      if (!links?.length) return;
      const first = links[0],
        last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        toggle.current?.focus();
      } else if (event.shiftKey && document.activeElement === toggle.current) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", keydown);
    };
  }, [open]);
  const hrefFor = (item: (typeof navigation)[number]) =>
    path === "/" ? `/#${item.section}` : item.href;
  return (
    <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="/" aria-label="BETAROG home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            const current =
              path === "/"
                ? active === item.section
                : path.startsWith(item.href) && item.href !== "/";
            return (
              <Link
                key={item.label}
                href={hrefFor(item)}
                className={current ? "active" : ""}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link className="header-cta" href="/contact">
          Let’s Talk <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle icon-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <m.div
            key="menu"
            ref={panel}
            id="mobile-menu"
            className="mobile-menu"
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <Link
                  key={item.label}
                  href={hrefFor(item)}
                  onClick={() => setOpen(false)}
                >
                  <span className="mono">0{index + 1}</span>
                  {item.label}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </nav>
            <p className="eyebrow">Engineering Ideas Into Reality.</p>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
