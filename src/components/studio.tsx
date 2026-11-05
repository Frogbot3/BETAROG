import { ArrowUpRight } from "lucide-react";
import { processSteps, technologies } from "@/lib/content";
import { founderSocialLinks } from "@/lib/social";
import { Eyebrow, SectionHeading } from "./ui";
import { ScrollSequence } from "./scroll-sequence";

export function Statement() {
  return (
    <section className="statement section" id="perspective">
      <div className="container">
        <ScrollSequence />
        <Eyebrow number="01">Our perspective</Eyebrow>
        <h2 data-reveal>
          Technology isn’t just
          <br />
          what we build.
          <br />
          <span className="statement-emphasis">
            It’s how we move
            <br className="mobile-break" /> the world forward.
          </span>
        </h2>
        <div className="statement-bottom">
          <span className="statement-mark" aria-hidden="true">
            ↗
          </span>
          <p>Engineering Ideas Into Reality.</p>
        </div>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionHeading
          number="04"
          label="The studio"
          copy="An emerging technology brand at the intersection of creative thinking and thoughtful product engineering."
        >
          Curiosity Drives Us.
          <br />
          Engineering Defines Us.
        </SectionHeading>
        <div className="about-story" data-reveal>
          <p>
            We believe valuable software starts with a good question. BETAROG
            brings technical curiosity, creative thinking, and a care for the
            details to the things we build.
          </p>
          <p>
            From useful digital products to explorations in AI, we’re here to
            keep learning, solve meaningful problems, and turn ambitious ideas
            into something real.
          </p>
        </div>
        <div className="founder" data-reveal>
          <div className="founder-monogram" aria-hidden="true">
            AMP<span>↗</span>
          </div>
          <div>
            <Eyebrow>Meet the founder</Eyebrow>
            <h3>ANAS MALIK P</h3>
            <p>
              Developer, technology enthusiast,
              <br />
              and aspiring AI researcher.
            </p>
          </div>
        </div>
        {founderSocialLinks.length > 0 && (
          <div className="founder-socials">
            <span className="eyebrow">Founder’s personal profiles</span>
            {founderSocialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
        <ul className="values" data-stagger>
          {[
            "Innovation",
            "Craftsmanship",
            "Reliability",
            "Learning",
            "Long-term thinking",
          ].map((value) => (
            <li key={value} data-reveal>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="section process">
      <div className="container">
        <SectionHeading number="05" label="Our process">
          Great ideas deserve
          <br />a thoughtful process.
        </SectionHeading>
        <div className="process-track">
          <div className="process-line" aria-hidden="true">
            <span className="process-line-progress" />
          </div>
          <ol data-stagger>
            {processSteps.map((step, index) => (
              <li key={step.name} data-reveal>
                <span className="process-number mono">0{index + 1}</span>
                <span className="process-dot" aria-hidden="true" />
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
export function Technology() {
  return (
    <section className="section technology">
      <div className="container">
        <SectionHeading number="06" label="Our toolkit">
          Built on Modern Technology.
        </SectionHeading>
        <div className="technology-grid" data-stagger>
          {technologies.map((group) => (
            <div className="technology-group" key={group.category} data-reveal>
              <h3>
                {group.category}
                <ArrowUpRight size={17} aria-hidden="true" />
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Research() {
  return (
    <section className="section research">
      <div className="container research-grid">
        <div data-reveal>
          <Eyebrow number="07">Explorations</Eyebrow>
          <h2>
            The next question
            <br />
            is where it begins.
          </h2>
          <p>
            Exploring the possibilities of intelligence, automation, and a more
            connected world. These are areas of curiosity, with documented work
            added as it develops.
          </p>
        </div>
        <div
          className="research-visual"
          data-ambient
          aria-label="Areas of exploration: artificial intelligence, machine learning, intelligent automation, data-driven applications, cybersecurity research, interactive scientific visualizations"
        >
          <div className="research-orbits" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <span />
          </div>
          <ul data-stagger>
            {[
              "Artificial intelligence",
              "Machine learning",
              "Intelligent automation",
              "Data-driven applications",
              "Cybersecurity research",
              "Scientific visualizations",
            ].map((area) => (
              <li key={area} data-reveal>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
