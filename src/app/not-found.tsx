import { ButtonLink, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="empty-page container">
      <Eyebrow>404 / A little off course</Eyebrow>
      <h1>
        Some things are
        <br />
        still to be built.
      </h1>
      <p>This page doesn’t exist, or the work isn’t published yet.</p>
      <ButtonLink href="/">Back to BETAROG</ButtonLink>
    </div>
  );
}
