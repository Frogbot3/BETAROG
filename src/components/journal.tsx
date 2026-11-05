import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/content/journal";
import { Eyebrow } from "./ui";
export function Journal() {
  return (
    <section className="section journal" id="insights">
      <div className="container journal-grid">
        <div data-reveal>
          <Eyebrow number="08">Journal</Eyebrow>
          <h2>
            Notes from
            <br />
            the build.
          </h2>
          <p>
            Engineering notes, questions worth asking, and a look behind the
            work.
          </p>
          <p className="journal-note">
            The first notes are taking shape.
            <br />
            Drafts will be published after review.
          </p>
        </div>
        <div className="journal-list" data-stagger>
          {articles.map((article) => (
            <article key={article.slug} data-reveal>
              <span className="eyebrow">{article.category}</span>
              <h3>
                {article.status === "published" && article.publishedAt ? (
                  <Link href={`/insights/${article.slug}`}>
                    {article.title}
                    <ArrowUpRight size={20} />
                  </Link>
                ) : (
                  article.title
                )}
              </h3>
              <p>{article.excerpt}</p>
              <span className="draft-label">
                {article.status === "draft"
                  ? "Draft — not yet published"
                  : `${article.readingMinutes} min read`}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
