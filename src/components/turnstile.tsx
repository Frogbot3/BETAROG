"use client";
import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const render = useCallback(() => {
    if (
      !sitekey ||
      !ref.current ||
      !window.turnstile ||
      widget.current !== null
    )
      return;
    widget.current = window.turnstile.render(ref.current, {
      sitekey,
      action: "contact",
      theme: "auto",
      size: "flexible",
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
  }, [sitekey, onToken]);
  useEffect(() => {
    render();
    return () => {
      if (widget.current !== null) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [render]);
  if (!sitekey) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={render}
      />
      <div ref={ref} className="turnstile" />
    </>
  );
}
