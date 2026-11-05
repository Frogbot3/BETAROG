import { ArrowDown } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink } from "./ui";
import { HeroVisual } from "./hero-visual";
export function Hero() {
  return (
    <section
      className="hero"
      id="home"
      aria-labelledby="hero-heading"
      data-ambient
    >
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="container hero-container">
        <HeroVisual />
        <div className="hero-content">
          <p className="eyebrow hero-status">
            <span className="status-dot" />
            Innovation in motion
          </p>
          <h1 id="hero-heading" aria-label="We build what's next.">
            <span className="hero-line">
              <span className="hero-line-inner">WE BUILD</span>
            </span>
            <span className="hero-line accent-text">
              <span className="hero-line-inner">WHAT’S NEXT.</span>
            </span>
          </h1>
          <p className="hero-description">{site.description}</p>
          <div className="hero-actions">
            <ButtonLink href="/#work">Explore Our Work</ButtonLink>
            <ButtonLink href="/contact" variant="text" direction="up">
              Start a Project
            </ButtonLink>
          </div>
        </div>
        <div className="hero-bottom">
          <span>AI & SOFTWARE INNOVATION STUDIO</span>
          <a href="#perspective">
            Scroll to explore{" "}
            <span className="scroll-cue" aria-hidden="true">
              <ArrowDown size={17} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
