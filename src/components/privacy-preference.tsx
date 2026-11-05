"use client";
import Script from "next/script";
import { useSyncExternalStore } from "react";
const eventName = "betarog-analytics-change";
function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
}
function getConsent() {
  try {
    return localStorage.getItem("betarog-analytics-v1") === "yes";
  } catch {
    return false;
  }
}
export function AnalyticsPreference() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const consent = useSyncExternalStore(subscribe, getConsent, () => false);
  if (!domain) return null;
  function toggle() {
    try {
      localStorage.setItem("betarog-analytics-v1", consent ? "no" : "yes");
      window.dispatchEvent(new Event(eventName));
      if (consent) window.location.reload();
    } catch {
      /* Storage unavailable: analytics remains off. */
    }
  }
  return (
    <>
      {consent && (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={domain}
          strategy="afterInteractive"
        />
      )}
      <button className="privacy-toggle" onClick={toggle}>
        {consent ? "Disable optional analytics" : "Allow optional analytics"}
      </button>
    </>
  );
}
