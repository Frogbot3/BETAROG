import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { Services } from "@/components/services";
import { Process, Technology } from "@/components/studio";
import { Contact } from "@/components/contact";
export const metadata: Metadata = {
  title: "Services",
  description:
    "AI integrations, modern web development, custom software, product design, security experiments, and cloud deployment.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        label="Our capabilities"
        title="Ideas need good engineering."
        description="From the first question to the final detail, we connect design and development to make useful things."
      />
      <Services />
      <Process />
      <Technology />
      <Contact />
    </>
  );
}
