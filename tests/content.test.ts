import { afterEach, describe, expect, it, vi } from "vitest";
import { getArticle, publicArticles } from "@/content/journal";
import { projects } from "@/lib/content";
import { brandSocialLinks, founderSocialLinks } from "@/lib/social";
afterEach(() => vi.unstubAllEnvs());
describe("publication and brand boundaries", () => {
  it("does not publish drafts", () => {
    expect(publicArticles()).toHaveLength(0);
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ENABLE_DRAFT_PREVIEWS", "true");
    expect(getArticle("designing-for-life-offline")).toBeUndefined();
  });
  it("supports explicitly enabled development previews", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ENABLE_DRAFT_PREVIEWS", "true");
    expect(getArticle("designing-for-life-offline")?.status).toBe("draft");
  });
  it("preserves honest project status", () => {
    expect(projects.find((p) => p.slug === "mosque-suite")?.status).toBe(
      "In Development",
    );
    expect(
      projects.find((p) => p.slug === "cybersecurity-dashboard")?.status,
    ).toBe("Experimental");
  });
  it("shows only the supplied official account by default", () => {
    expect(brandSocialLinks).toEqual([
      {
        name: "Instagram",
        url: "https://www.instagram.com/betarog/",
        account: "brand",
      },
    ]);
    expect(founderSocialLinks).toEqual([]);
  });
});
