"use client";

import EmptyState from "@/components/common/EmptyState";
import SearchFilter from "@/components/common/SearchFilter";
import { projects } from "@/data/projects";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.type)),
  ];

  const filteredProjects = projects.filter((project) => {
    const searchText = (
      project.name +
      " " +
      project.description +
      " " +
      project.stack.join(" ")
    ).toLowerCase();
    const matchesSearch = searchText.includes(query.toLowerCase());
    const matchesCategory = category === "All" || project.type === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SearchFilter
        label="projects"
        query={query}
        category={category}
        categories={categories}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />
      <p className="result-count" aria-live="polite">
        {filteredProjects.length} results
      </p>
      <div className="two-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <EmptyState
          title="No projects found."
          text="Try another search or category."
        />
      )}
    </>
  );
};

export default ProjectList;
