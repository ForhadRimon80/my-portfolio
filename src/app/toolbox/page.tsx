import PageHeading from "@/components/common/PageHeading";
import ToolboxList from "@/components/toolbox/ToolboxList";
export const metadata = { title: "Toolbox" };
export default function Toolbox() {
  return (
    <>
      <PageHeading
        label="THE EVERYDAY TOOLKIT"
        title="Good tools. Room to experiment."
        description="A collection of the tools I work with and places I turn to while building for the web."
      />
      <ToolboxList />
    </>
  );
}
