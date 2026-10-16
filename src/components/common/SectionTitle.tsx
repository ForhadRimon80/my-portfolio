import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function SectionTitle({
  label,
  title,
  href,
  link = "Explore all",
}: {
  label: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-link">
          {link}
          <FiArrowUpRight />
        </Link>
      )}
    </div>
  );
}
