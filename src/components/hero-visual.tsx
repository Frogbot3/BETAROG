"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
const OrbitalScene = dynamic(() => import("./orbital-scene"), { ssr: false });
class VisualBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => {
    setReady(false);
    setEnabled(false);
  }, []);
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
    );
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      if (
        !query.matches ||
        connection?.saveData ||
        navigator.hardwareConcurrency < 4
      ) {
        setEnabled(false);
        return;
      }
      timer = setTimeout(() => {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2", {
          failIfMajorPerformanceCaveat: true,
        });
        if (gl) {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
          setEnabled(true);
        }
      }, 1100);
    };
    update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (root.current) observer.observe(root.current);
    const visibility = () =>
      setVisible(
        document.visibilityState === "visible" &&
          (root.current?.getBoundingClientRect().bottom ?? 0) > 0,
      );
    document.addEventListener("visibilitychange", visibility);
    return () => {
      clearTimeout(timer);
      query.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div className="hero-visual" ref={root} aria-hidden="true">
      <div className="orbital-aura" />
      <div className="orbital-field">
        <span />
        <span />
      </div>
      <Image
        src="/images/orbital.webp"
        alt=""
        width={1000}
        height={1000}
        priority
        sizes="(max-width: 899px) 90vw, 50vw"
        className={`orbital-fallback ${ready && enabled ? "is-hidden" : ""}`}
      />
      {enabled && (
        <VisualBoundary>
          <div className={`orbital-canvas ${ready ? "is-ready" : ""}`}>
            <OrbitalScene
              active={visible}
              onReady={handleReady}
              onFailure={handleFailure}
            />
          </div>
        </VisualBoundary>
      )}
    </div>
  );
}
