"use client";
import { ButtonLink, Eyebrow } from "@/components/ui";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="empty-page container">
      <Eyebrow>A pause in the process</Eyebrow>
      <h1>Let’s try that again.</h1>
      <p>This page couldn’t load. Your next idea can wait a moment.</p>
      <div className="hero-actions">
        <button className="button button-primary" onClick={reset}>
          Try again
        </button>
        <ButtonLink href="/" variant="text">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
