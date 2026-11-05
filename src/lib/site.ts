import { brandSocialLinks } from "./social";

export const site = {
  name: "BETAROG",
  tagline: "We Build What's Next.",
  description:
    "BETAROG transforms ambitious ideas into intelligent software, powerful digital products, and experiences built for the future.",
  positioning: "AI & Software Innovation Studio",
  founder: "ANAS MALIK P",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  // Missing brand information is intentionally left unset until supplied and verified.
  social: brandSocialLinks,
};
export const navigation = [
  { label: "Home", href: "/", section: "home" },
  { label: "Services", href: "/services", section: "services" },
  { label: "Work", href: "/work", section: "work" },
  { label: "About", href: "/about", section: "about" },
  { label: "Insights", href: "/insights", section: "insights" },
  { label: "Contact", href: "/contact", section: "contact" },
] as const;
