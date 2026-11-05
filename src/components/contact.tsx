import { ArrowUpRight } from "lucide-react";
import { contactConfigured } from "@/lib/contact-config";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { Eyebrow } from "./ui";
export function Contact({ initialService }: { initialService?: string }) {
  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy" data-reveal>
          <Eyebrow number="09">Let’s create what’s next</Eyebrow>
          <h2>
            HAVE A <br />
            BOLD IDEA?
            <br />
            <span className="accent-text">LET’S BUILD IT.</span>
          </h2>
          <p>
            Tell us what you have in mind.
            <br />
            Every possibility starts with a conversation.
          </p>
          {site.email && (
            <a className="contact-email" href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={19} />
            </a>
          )}
          <div className="contact-socials">
            {site.social.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <ContactForm
          configured={contactConfigured()}
          initialService={initialService}
        />
      </div>
    </section>
  );
}
