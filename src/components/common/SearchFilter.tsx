interface ISearchFilter {
  label: string;
  query: string;
  category: string;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const SearchFilter = ({
  label,
  query,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
}: ISearchFilter) => {
  return (
    <div className="catalog-toolbar">
      <div className="search-field">
        <input
          aria-label={"Search " + label}
          placeholder={"Search " + label + "…"}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
      <div className="filters">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "filter active" : "filter"}
            aria-pressed={category === item}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
