import { Eyebrow } from "./ui";
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro container" data-reveal>
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
