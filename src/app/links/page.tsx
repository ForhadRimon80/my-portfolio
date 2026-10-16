import PageHeading from "@/components/common/PageHeading";
import { profile } from "@/data/profile";
export const metadata = { title: "Links" };
export default function Links() {
  return (
    <>
      <PageHeading
        label="FIND ME AROUND THE WEB"
        title="A few good places to start."
        description="Projects, professional connections, and ways to get in touch."
      />
      <div className="link-list">
        {[
          ["GitHub", "Source code and projects", profile.github],
          ["LinkedIn", "Work and conversations", profile.linkedin],
          ["Projects", "A closer look at what I build", "/projects"],
          ["Contact", "Have an idea? Say hello.", "/contact"],
        ].map(([title, text, url]) => (
          <a href={url} className="card" key={title}>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <span>↗</span>
          </a>
        ))}
      </div>
    </>
  );
}
