export type SocialLink = {
  name: "GitHub" | "LinkedIn" | "Instagram";
  url: string;
  account: "brand" | "founder";
};
function verifiedLinks(
  links: {
    name: SocialLink["name"];
    url?: string;
    account: SocialLink["account"];
  }[],
): SocialLink[] {
  return links.filter((link): link is SocialLink => {
    if (!link.url) return false;
    try {
      return new URL(link.url).protocol === "https:";
    } catch {
      return false;
    }
  });
}
// Official BETAROG accounts only. Add official GitHub/LinkedIn accounts here when available.
export const brandSocialLinks = verifiedLinks([
  {
    name: "Instagram",
    url:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://www.instagram.com/betarog/",
    account: "brand",
  },
  {
    name: "GitHub",
    url: process.env.NEXT_PUBLIC_BRAND_GITHUB_URL,
    account: "brand",
  },
  {
    name: "LinkedIn",
    url: process.env.NEXT_PUBLIC_BRAND_LINKEDIN_URL,
    account: "brand",
  },
]);
// Personal profiles belong to the founder and are never silently labeled brand accounts.
export const founderSocialLinks = verifiedLinks([
  {
    name: "GitHub",
    url: process.env.NEXT_PUBLIC_FOUNDER_GITHUB_URL,
    account: "founder",
  },
  {
    name: "LinkedIn",
    url: process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN_URL,
    account: "founder",
  },
]);
