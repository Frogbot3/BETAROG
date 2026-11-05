"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionSystem() {
  const path = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanup = () => {};

    function setup() {
      cleanup();
      cleanup = () => {};
      if (reduced.matches) return;

      const animations = new Set<Animation>();
      const registered = new WeakSet<Element>();
      const ambientElements = new Set<HTMLElement>();
      const visibleAmbient = new Set<HTMLElement>();
      const saveData = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection?.saveData;
      const reveal = new IntersectionObserver(
        (entries) => {
          const groups = new Map<Element, number>();
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            const group = element.parentElement;
            const index = group?.hasAttribute("data-stagger")
              ? (groups.get(group) ?? 0)
              : 0;
            if (group) groups.set(group, index + 1);
            const wordmark = element.dataset.reveal === "wordmark";
            const depth = element.matches(
              ".service-card, .project-card, .technology-group",
            );
            const animation = element.animate(
              [
                {
                  opacity: 0,
                  transform: wordmark
                    ? "translateY(50px) scale(.96)"
                    : depth
                      ? "perspective(1200px) translateY(48px) rotateX(7deg) scale(.97)"
                      : "translateY(40px)",
                },
                { opacity: 1, transform: "translateY(0) scale(1)" },
              ],
              {
                duration: wordmark ? 1200 : 1000,
                delay: Math.min(index * 100, 400),
                easing: "cubic-bezier(.16,1,.3,1)",
                fill: "backwards",
              },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
            reveal.unobserve(element);
          });
        },
        { threshold: 0.12 },
      );
      const ambient = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) visibleAmbient.add(element);
          else visibleAmbient.delete(element);
          element.dataset.motionActive = String(
            entry.isIntersecting && !document.hidden,
          );
        });
      });
      const motionElements = (root: Element) => [
        ...(root.matches("[data-reveal], [data-ambient]") ? [root] : []),
        ...root.querySelectorAll<HTMLElement>("[data-reveal], [data-ambient]"),
      ];
      function register(root: Element) {
        motionElements(root).forEach((node) => {
          if (registered.has(node)) return;
          registered.add(node);
          if (node.hasAttribute("data-reveal")) reveal.observe(node);
          if (
            !saveData &&
            node instanceof HTMLElement &&
            node.hasAttribute("data-ambient")
          ) {
            ambientElements.add(node);
            ambient.observe(node);
          }
        });
      }
      register(document.body);
      // Filtered projects and streamed route content receive the same entrances.
      const mutations = new MutationObserver((records) => {
        records.forEach((record) => {
          record.removedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            motionElements(node).forEach((element) => {
              reveal.unobserve(element);
              ambient.unobserve(element);
              registered.delete(element);
              if (element instanceof HTMLElement) {
                ambientElements.delete(element);
                visibleAmbient.delete(element);
              }
            });
          });
          record.addedNodes.forEach((node) => {
            if (node instanceof Element) register(node);
          });
        });
      });
      const main = document.getElementById("main");
      if (main) mutations.observe(main, { childList: true, subtree: true });

      let active: HTMLElement | null = null;
      let bounds: DOMRect | null = null;
      let frame = 0;
      let pointerX = 0;
      let pointerY = 0;
      function resetPointer() {
        cancelAnimationFrame(frame);
        frame = 0;
        if (active) {
          active.style.translate = "";
          ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y"].forEach((name) =>
            active?.style.removeProperty(name),
          );
        }
        active = null;
        bounds = null;
      }
      function paintPointer() {
        frame = 0;
        if (!active || !bounds) return;
        const x = Math.max(
          -0.5,
          Math.min(0.5, (pointerX - bounds.left) / bounds.width - 0.5),
        );
        const y = Math.max(
          -0.5,
          Math.min(0.5, (pointerY - bounds.top) / bounds.height - 0.5),
        );
        if (active.hasAttribute("data-tilt")) {
          active.style.setProperty("--tilt-x", `${-y * 7}deg`);
          active.style.setProperty("--tilt-y", `${x * 7}deg`);
          active.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
          active.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
        } else {
          active.style.translate = `${x * 12}px ${y * 8}px`;
        }
      }
      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse") return;
        const target =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>("[data-magnetic], [data-tilt]")
            : null;
        if (target !== active) {
          resetPointer();
          active = target;
          bounds = target?.getBoundingClientRect() ?? null;
        }
        if (!active) return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!frame) frame = requestAnimationFrame(paintPointer);
      }
      function leave(event: PointerEvent) {
        if (
          !(event.relatedTarget instanceof Node) ||
          !active?.contains(event.relatedTarget)
        ) {
          resetPointer();
        }
      }
      function visibility() {
        visibleAmbient.forEach((element) => {
          element.dataset.motionActive = String(!document.hidden);
        });
        if (document.hidden) resetPointer();
      }
      if (fine.matches && !saveData) {
        document.addEventListener("pointermove", move, { passive: true });
        document.addEventListener("pointerout", leave, { passive: true });
        document.addEventListener("keydown", resetPointer);
        window.addEventListener("scroll", resetPointer, { passive: true });
        window.addEventListener("resize", resetPointer);
        window.addEventListener("blur", resetPointer);
      }
      document.addEventListener("visibilitychange", visibility);
      cleanup = () => {
        reveal.disconnect();
        ambient.disconnect();
        mutations.disconnect();
        animations.forEach((animation) => animation.cancel());
        ambientElements.forEach(
          (element) => delete element.dataset.motionActive,
        );
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerout", leave);
        document.removeEventListener("keydown", resetPointer);
        window.removeEventListener("scroll", resetPointer);
        window.removeEventListener("resize", resetPointer);
        window.removeEventListener("blur", resetPointer);
        document.removeEventListener("visibilitychange", visibility);
        resetPointer();
      };
    }
    setup();
    reduced.addEventListener("change", setup);
    fine.addEventListener("change", setup);
    return () => {
      cleanup();
      reduced.removeEventListener("change", setup);
      fine.removeEventListener("change", setup);
    };
  }, [path]);
  return <div className="reading-progress" aria-hidden="true" />;
}
