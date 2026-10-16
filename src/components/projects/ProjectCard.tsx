import { projects } from "@/data/projects";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({
  project: p,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <Link href={"/projects/" + p.slug} className="project-card">
      <div className={"project-visual " + p.color}>
        <div className="mini-browser">
          <div className="browser-head">
            <span>● ● ●</span>
            <small>{p.slug}.app</small>
          </div>
          <div className="browser-body">
            <b>{p.bn}</b>
            <h3>
              {p.slug === "bazar-dor" ? (
                <>
                  আজকের বাজারের দাম
                  <br />
                  এক নজরে।
                </>
              ) : (
                <>
                  খবরের সঙ্গে থাকুন,
                  <br />
                  নিজের ভাষায়।
                </>
              )}
            </h3>
            <div className="mini-grid">
              {(p.slug === "bazar-dor"
                ? ["🥦", "🍚", "🐟"]
                : ["সর্বশেষ", "বাংলাদেশ", "বিশ্ব"]
              ).map((x) => (
                <div key={x}>{x}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <span className="eyebrow">{p.type}</span>
        <h3>
          {p.name}
          <FiArrowUpRight />
        </h3>
        <p>{p.description}</p>
        <div className="tags">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
