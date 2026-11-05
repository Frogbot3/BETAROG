import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { About, Process, Research, Technology } from "@/components/studio";
import { Contact } from "@/components/contact";
export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "Meet BETAROG and founder Anas Malik P: an emerging technology brand driven by curiosity, craftsmanship, and thoughtful engineering.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About BETAROG"
        title="Curious by nature. Builders by choice."
        description="An emerging AI and software innovation studio with an ambition to turn useful ideas into considered digital products."
      />
      <About />
      <Process />
      <Technology />
      <Research />
      <Contact />
    </>
  );
}
