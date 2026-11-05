import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Explore BETAROG's deployed projects, software in development, and research explorations.",
  alternates: { canonical: "/work" },
};
export default function WorkPage() {
  return (
    <>
      <PageIntro
        label="The work"
        title="A thought. A build. A possibility."
        description="A closer look at the products and questions that shape our practice. Each project is shown at its current stage."
      />
      <Projects />
      <Contact />
    </>
  );
}
