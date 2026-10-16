"use client";

import EmptyState from "@/components/common/EmptyState";
import SearchFilter from "@/components/common/SearchFilter";
import { tools } from "@/data/tools";
import { useState } from "react";
import ToolCard from "./ToolCard";

const ToolboxList = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(tools.map((tool) => tool.category))];

  const filteredTools = tools.filter((tool) => {
    const searchText = (tool.name + " " + tool.description).toLowerCase();
    const matchesSearch = searchText.includes(query.toLowerCase());
    const matchesCategory = category === "All" || tool.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SearchFilter
        label="tools"
        query={query}
        category={category}
        categories={categories}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />
      <p className="result-count" aria-live="polite">
        {filteredTools.length} results
      </p>
      <div className="three-grid pb-6">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
      {filteredTools.length === 0 && (
        <EmptyState
          title="No tools found."
          text="Try another search or category."
        />
      )}
    </>
  );
};

export default ToolboxList;
