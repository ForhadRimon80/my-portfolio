import PageHeading from "@/components/common/PageHeading";
import ProjectList from "@/components/projects/ProjectList";
export const metadata = { title: "Projects" };
export default function Projects() {
  return (
    <>
      <PageHeading
        label="SELECTED WORK"
        title="Built to learn. Made to be useful."
        description="A few personal projects that connect practical problems with thoughtful interfaces."
      />
      <ProjectList />
    </>
  );
}
