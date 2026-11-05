import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Privacy Policy — Review Template",
  robots: { index: false, follow: true },
};
export default function PrivacyPage() {
  return (
    <article className="legal-page container">
      <p className="eyebrow">Review template · Not a finalized legal notice</p>
      <h1>Privacy Policy</h1>
      <p className="legal-intro">
        This page describes the intended website configuration. BETAROG’s legal
        operator, privacy contact, applicable jurisdiction, retention periods,
        and deployed service settings must be confirmed before public launch.
      </p>
      <h2>Project inquiries</h2>
      <p>
        The inquiry form asks for your name, email, project type, budget range,
        and message. When delivery is enabled, this information is submitted to
        the website’s server and sent to the configured business mailbox through
        Resend. The website application does not write inquiry contents to a
        database or application logs.
      </p>
      <p>
        If the form says delivery is not connected, no email is sent. Please
        avoid including passwords, payment information, or other sensitive
        information in an inquiry.
      </p>
      <h2>Abuse prevention</h2>
      <p>
        When configured, Cloudflare Turnstile verifies submissions. A rate
        limiter stores a keyed hash of the request’s IP address with a
        short-lived counter in Upstash Redis for up to 15 minutes. Hosting and
        service providers may also process request metadata under their own
        policies.
      </p>
      <h2>Local preferences and optional analytics</h2>
      <p>
        The selected color theme is stored in your browser. Optional Plausible
        analytics is disabled by default. If it is configured, it loads only
        after you choose “Allow optional analytics” in the footer. The
        preference is stored locally and can be withdrawn with the same control.
      </p>
      <h2>External links</h2>
      <p>
        Project and social links take you to external services with their own
        privacy practices. The official BETAROG Instagram account is linked
        separately from any founder profiles supplied later.
      </p>
      <h2>Retention and requests</h2>
      <p>
        The operator still needs to specify how long inquiry emails are retained
        and how privacy requests can be made. A business email has not yet been
        finalized. This template does not promise a response timeframe or assert
        particular legal rights before jurisdiction is reviewed.
      </p>
      <h2>Before publication</h2>
      <p>
        Review actual provider settings, hosting logs, international transfers
        where relevant, retention, contact details, and applicable requirements.
        Replace this review notice with the verified operator details and an
        effective date.
      </p>
      <Link className="text-link" href="/contact">
        Back to contact
      </Link>
    </article>
  );
}
