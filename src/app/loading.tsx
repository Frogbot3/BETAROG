export default function Loading() {
  return (
    <div
      className="loading-page container"
      role="status"
      aria-label="Loading page"
    >
      <div className="skeleton skeleton-small" />
      <div className="skeleton skeleton-heading" />
      <div className="skeleton skeleton-heading short" />
      <div className="skeleton skeleton-copy" />
      <span className="sr-only">Loading BETAROG…</span>
    </div>
  );
}
