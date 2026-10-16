import { tools } from "@/data/tools";
import { FiArrowUpRight } from "react-icons/fi";

interface IToolCard {
  tool: (typeof tools)[number];
}

const ToolCard = ({ tool }: IToolCard) => {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tool-card card"
    >
      <span className={"tool-letter " + tool.color}>{tool.letter}</span>
      <span className="eyebrow">{tool.category}</span>
      <h3>
        {tool.name}
        <FiArrowUpRight />
      </h3>
      <p>{tool.description}</p>
    </a>
  );
};

export default ToolCard;
