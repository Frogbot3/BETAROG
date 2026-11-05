import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle, publicArticles } from "@/content/journal";
import { Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";
export function generateStaticParams() {
  return publicArticles().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return {
    title: article?.title || "Article not found",
    description: article?.excerpt,
    robots:
      article?.status === "published"
        ? undefined
        : { index: false, follow: false },
    alternates: { canonical: `/insights/${slug}` },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = publicArticles().filter((item) => item.slug !== slug);
  return (
    <article className="article-page container">
      <Link href="/insights" className="back-link">
        <ArrowLeft size={16} />
        All insights
      </Link>
      <header>
        <Eyebrow>{article.category}</Eyebrow>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <span>BETAROG</span>
          <span>{article.readingMinutes} min read</span>
          {article.publishedAt ? (
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          ) : (
            <span className="draft-label">
              Unpublished draft · Local preview
            </span>
          )}
        </div>
      </header>
      <div className="article-layout">
        <nav aria-label="Table of contents">
          <Eyebrow>On this page</Eyebrow>
          {article.blocks.map((block) => (
            <a key={block.id} href={`#${block.id}`}>
              {block.heading}
            </a>
          ))}
        </nav>
        <div className="article-prose">
          {article.blocks.map((block) => (
            <section key={block.id} id={block.id}>
              <h2>{block.heading}</h2>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {block.code && (
                <pre>
                  <code>{block.code}</code>
                </pre>
              )}
            </section>
          ))}
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-posts">
          <h2>Keep exploring</h2>
          {related.map((item) => (
            <Link key={item.slug} href={`/insights/${item.slug}`}>
              {item.title}
            </Link>
          ))}
        </section>
      )}
      {article.status === "published" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.excerpt,
              datePublished: article.publishedAt,
              author: { "@type": "Organization", name: site.name },
              mainEntityOfPage: `${site.url}/insights/${slug}`,
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </article>
  );
}
