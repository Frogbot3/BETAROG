import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import {
  About,
  Process,
  Research,
  Statement,
  Technology,
} from "@/components/studio";
import { Journal } from "@/components/journal";
import { Contact } from "@/components/contact";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <Projects />
      <About />
      <Process />
      <Technology />
      <Research />
      <Journal />
      <Contact />
    </>
  );
}
