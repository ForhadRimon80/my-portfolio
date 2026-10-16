import SectionTitle from "@/components/common/SectionTitle";
import Link from "next/link";
import { FiArrowUpRight, FiCalendar, FiCode, FiTool } from "react-icons/fi";
export default function AboutSection() {
  return (
    <section className="section">
      <SectionTitle
        label="BEYOND THE INTRODUCTION"
        title="A few things about my corner."
      />
      <div className="bento">
        <Link href="/about" className="bento-card about-bento">
          <span className="tile-icon mint">
            <FiCode />
          </span>
          <span className="eyebrow">THE PERSON</span>
          <h3>
            Curiosity is the
            <br />
            common thread.
          </h3>
          <p>
            A CSE background, a love for the web, and an interest in what comes
            next.
          </p>
          <span className="text-link">
            Meet Farhad
            <FiArrowUpRight />
          </span>
          <div className="bento-decoration">✳</div>
        </Link>
        <Link href="/toolbox" className="bento-card">
          <span className="tile-icon lavender">
            <FiTool />
          </span>
          <h3>My everyday toolkit</h3>
          <p>The tools behind the interfaces.</p>
          <div className="tool-chips">
            <b>N</b>
            <b>⚛</b>
            <b>TS</b>
            <b>≈</b>
          </div>
          <FiArrowUpRight className="corner-arrow" />
        </Link>
        <Link href="/contact" className="bento-card">
          <span className="tile-icon peach">
            <FiCalendar />
          </span>
          <h3>Let’s make a connection.</h3>
          <p>A project, an opportunity, or a shared interest.</p>
          <span className="text-link">
            Say hello
            <FiArrowUpRight />
          </span>
        </Link>
      </div>
    </section>
  );
}
