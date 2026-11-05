"use client";
import { useEffect, useRef } from "react";
export function ScrollSequence() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let revert: (() => void) | undefined;
    if (media.matches) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed || media.matches) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.fromTo(
            ".statement-emphasis",
            { opacity: 0.35 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: ".statement",
                start: "top 75%",
                end: "bottom 55%",
                scrub: 0.7,
              },
            },
          );
          if (document.querySelector(".process-line-progress"))
            gsap.fromTo(
              ".process-line-progress",
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".process",
                  start: "top 80%",
                  end: "bottom 55%",
                  scrub: 0.6,
                },
              },
            );
        });
        revert = () => mm.revert();
      },
      { rootMargin: "300px" },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      disposed = true;
      observer.disconnect();
      revert?.();
    };
  }, []);
  return <div ref={root} className="sequence-marker" aria-hidden="true" />;
}
