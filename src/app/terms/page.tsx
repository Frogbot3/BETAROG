import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Service — Review Template",
  robots: { index: false, follow: true },
};
export default function TermsPage() {
  return (
    <article className="legal-page container">
      <p className="eyebrow">
        Review template · Not finalized contractual terms
      </p>
      <h1>Terms of Service</h1>
      <p className="legal-intro">
        This is reviewable template language for the BETAROG website. Legal
        operator details, governing law, business contact, and any enforceable
        contract terms require review before public launch.
      </p>
      <h2>About this website</h2>
      <p>
        The website introduces BETAROG’s work, capabilities, and areas of
        exploration. Projects are labeled by their current status. Concept
        artwork, drafts, prototypes, and development plans are not
        representations of completed commercial services.
      </p>
      <h2>Project conversations</h2>
      <p>
        Submitting an inquiry starts a conversation. It does not create a
        service agreement, guarantee availability, or establish pricing,
        deliverables, or a delivery date. Any project would require a separately
        agreed scope.
      </p>
      <h2>Website use</h2>
      <p>
        Visitors are asked to use the site responsibly and not attempt to
        disrupt it, bypass its form protections, or submit harmful content.
        External project and social links are provided for context and are
        governed by their respective services.
      </p>
      <h2>Content and attribution</h2>
      <p>
        BETAROG identity and original website material are presented as brand
        content. Referenced technology names belong to their respective owners;
        their inclusion does not imply partnership, endorsement, or
        certification.
      </p>
      <h2>Review required</h2>
      <p>
        Before finalizing this page, the operator should review intellectual
        property provisions, permitted use, liability wording where appropriate,
        governing law, dispute handling, and contact information. No
        jurisdiction, certification, warranty, or legal promise is invented in
        this template.
      </p>
    </article>
  );
}
