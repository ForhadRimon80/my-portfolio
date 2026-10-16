import PageHeading from "@/components/common/PageHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: projects.find((p) => p.slug === slug)?.name || "Project not found",
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageHeading label={p.type} title={p.name} description={p.description} />
      <div className="detail-grid">
        <div className="prose">
          <h2>What’s inside</h2>
          <ul className="feature-list">
            {p.features.map((f) => (
              <li key={f}>
                <FiCheck />
                {f}
              </li>
            ))}
          </ul>
          <h2>A takeaway</h2>
          <p>{p.lesson}</p>
        </div>
        <aside className="card">
          <h3>Under the hood</h3>
          <div className="tags">
            {p.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <a
            className="button primary"
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the source
            <FiArrowUpRight />
          </a>
          <Link className="text-link" href="/projects">
            ← All projects
          </Link>
        </aside>
      </div>
      <section className="section">
        <h2>Another thing I’ve built.</h2>
        <div className="two-grid">
          {projects
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <ProjectCard key={x.slug} project={x} />
            ))}
        </div>
      </section>
    </>
  );
}
