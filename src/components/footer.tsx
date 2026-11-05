import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/lib/site";
import { ThemeControl } from "./theme-control";
import { AnalyticsPreference } from "./privacy-preference";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <p>Engineering Ideas Into Reality.</p>
          <a href="#top" className="back-top">
            Back to top <ArrowUp size={17} aria-hidden="true" />
          </a>
        </div>
        <div
          className="footer-wordmark"
          aria-label="BETAROG"
          data-reveal="wordmark"
        >
          BETAROG<span aria-hidden="true">/</span>
        </div>
        <div className="footer-bottom">
          <div className="footer-brand-copy">
            <p>
              AI & Software
              <br />
              Innovation Studio.
            </p>
            <ThemeControl />
          </div>
          <nav aria-label="Footer navigation">
            <span className="eyebrow">Explore</span>
            {navigation
              .filter((item) => item.label !== "Home")
              .map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
          <nav aria-label="Footer services">
            <span className="eyebrow">Expertise</span>
            <Link href="/services">AI & Machine Learning</Link>
            <Link href="/services">Web Development</Link>
            <Link href="/services">Software Engineering</Link>
            <Link href="/services">Cloud & Deployment</Link>
          </nav>
          <nav aria-label="Footer projects">
            <span className="eyebrow">Selected work</span>
            <Link href="/work/tech-ai">TECH AI</Link>
            <Link href="/work/mosque-suite">Mosque Suite</Link>
            <Link href="/work/cybersecurity-dashboard">
              Cybersecurity Dashboard
            </Link>
          </nav>
          <nav aria-label="Legal and social links">
            <span className="eyebrow">Details</span>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            {site.social.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
                <ArrowUpRight size={13} />
              </a>
            ))}
            <AnalyticsPreference />
          </nav>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getUTCFullYear()} BETAROG</span>
          <span>Built with curiosity. Crafted with care.</span>
        </div>
      </div>
    </footer>
  );
}
