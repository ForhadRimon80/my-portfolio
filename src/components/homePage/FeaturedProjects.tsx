import SectionTitle from "@/components/common/SectionTitle";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
export default function FeaturedProjects() {
  return (
    <section className="section">
      <SectionTitle
        label="SELECTED PROJECTS"
        title="Ideas, out in the world."
        href="/projects"
      />
      <div className="two-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
