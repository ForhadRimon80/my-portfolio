import getAdminStats from "@/lib/adminStats";

interface IStatsCards {
  stats: Awaited<ReturnType<typeof getAdminStats>>;
}

const StatsCards = ({ stats }: IStatsCards) => {
  return (
    <>
      <div className="three-grid stats-grid">
        {[
          ["GitHub followers", stats.github?.followers, "From the GitHub API"],
          ["Public repositories", stats.github?.repos, "From the GitHub API"],
          ["Page reads", stats.views, "Deduplicated daily page reads"],
          ["Projects", stats.projects, "In this portfolio"],
        ].map(([label, value, detail]) => (
          <div className="card stat" key={String(label)}>
            <span className="eyebrow">{label}</span>
            <strong>
              {value === null || value === undefined
                ? "—"
                : Number(value).toLocaleString()}
            </strong>
            <small>
              {value === null || value === undefined
                ? "Unavailable / not connected"
                : detail}
            </small>
          </div>
        ))}
      </div>
      <p className="muted">
        GitHub data may be cached for one hour. Page reads are estimates, not
        unique people. Statistics are visible only in this admin session.
      </p>
    </>
  );
};

export default StatsCards;
