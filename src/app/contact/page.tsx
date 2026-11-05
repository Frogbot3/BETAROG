import type { Metadata } from "next";
import { Contact } from "@/components/contact";
export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Start a conversation about an ambitious idea, a digital product, or a software challenge.",
  alternates: { canonical: "/contact" },
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return (
    <div className="contact-page">
      <h1 className="sr-only">Start a project with BETAROG</h1>
      <Contact initialService={service} />
    </div>
  );
}
