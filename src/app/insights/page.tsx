import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { Journal } from "@/components/journal";
import { Research } from "@/components/studio";
export const metadata: Metadata = {
  title: "Insights & Journal",
  description:
    "Engineering notes, AI explorations, and a look behind the build. First drafts are in preparation.",
  alternates: { canonical: "/insights" },
};
export default function InsightsPage() {
  return (
    <>
      <PageIntro
        label="Ideas in progress"
        title="Think deeply. Build thoughtfully."
        description="A journal for engineering, AI & ML, development, research, and the discoveries behind the build."
      />
      <Journal />
      <Research />
    </>
  );
}
