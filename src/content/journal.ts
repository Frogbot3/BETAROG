export type ArticleBlock = {
  id: string;
  heading: string;
  paragraphs: string[];
  code?: string;
};
export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  status: "draft" | "published";
  publishedAt?: string;
  readingMinutes: number;
  blocks: ArticleBlock[];
};
// Author articles here. Set status and a real publishedAt date only after editorial review.
export const articles: Article[] = [
  {
    slug: "designing-for-life-offline",
    title: "Designing for life offline",
    category: "Engineering",
    excerpt:
      "Exploring local data, resilient workflows, and the decisions behind desktop software.",
    status: "draft",
    readingMinutes: 3,
    blocks: [
      {
        id: "starting-offline",
        heading: "Start with the working environment",
        paragraphs: [
          "An offline application starts with a simple constraint: the person using it should be able to finish their task without a network connection. That changes where data lives and how the application handles failure.",
          "For an administrative tool, this raises practical questions about registration, record relationships, and how changes are validated before they are saved.",
        ],
      },
      {
        id: "data-boundaries",
        heading: "Make data boundaries explicit",
        paragraphs: [
          "Keep database access behind a small, deliberate interface. In an Electron application, the renderer should request specific operations instead of receiving unrestricted access to the system.",
          "The following is an illustrative TypeScript interface, not code copied from a completed project.",
        ],
        code: "type MemberInput = { name: string; familyId: string };\n\ninterface MemberRepository {\n  create(input: MemberInput): Promise<{ id: string }>;\n  findByFamily(familyId: string): Promise<MemberInput[]>;\n}",
      },
      {
        id: "recovery",
        heading: "Design for recovery",
        paragraphs: [
          "Local storage does not remove the need for backups. Export, restore, schema migrations, and interrupted writes deserve attention early in the design.",
          "This draft records design questions for future work. It does not report completed features or production results from Mosque Suite.",
        ],
      },
    ],
  },
  {
    slug: "practical-intelligent-products",
    title: "A practical approach to intelligent products",
    category: "AI & ML",
    excerpt:
      "Start with a useful question. Define a baseline. Learn from the result.",
    status: "draft",
    readingMinutes: 3,
    blocks: [
      {
        id: "useful-question",
        heading: "Find a useful question",
        paragraphs: [
          "A model is a component in a product, not the whole product. Begin by understanding which decision or repetitive task could become easier for the person using it.",
          "Describe the intended behavior and the situations where the system should ask for human input.",
        ],
      },
      {
        id: "baseline",
        heading: "Establish a baseline",
        paragraphs: [
          "Before adding complexity, compare the proposed approach with a simpler workflow. Decide what improvement would be meaningful and how it could be measured.",
          "Separate a promising demonstration from a result that holds across representative examples.",
        ],
      },
      {
        id: "limits",
        heading: "Keep the limits visible",
        paragraphs: [
          "Interfaces should help people understand uncertainty. Clear failure states and a route to correction are part of the engineering work.",
          "This is an unpublished editorial draft. Specific experiments, datasets, and validated outcomes will be included only when they exist and have been reviewed.",
        ],
      },
    ],
  },
];
export function publicArticles() {
  return articles.filter(
    (article) => article.status === "published" && article.publishedAt,
  );
}
export function getArticle(slug: string) {
  const article = articles.find((item) => item.slug === slug);
  const preview =
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_DRAFT_PREVIEWS === "true";
  return article &&
    ((article.status === "published" && article.publishedAt) || preview)
    ? article
    : undefined;
}
