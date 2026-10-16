import { profile } from "@/data/profile";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="hero">
      <div className="avatar-orbit">
        <div className="avatar overflow-hidden">
          <Image src="/images/profile.jpg" alt="Farhad Rimon" width={84} height={84} preload className="h-full w-full rounded-full object-cover" />
        </div>

        <span className="orbit-dot" aria-hidden="true" />
      </div>

      <span className="status">
        <i aria-hidden="true" />
        DEVELOPER · BUILDER · CURIOUS HUMAN
      </span>

      <h1>
        Hey, I’m Farhad.
        <br />
        Welcome to my
        <br />
        <span className="underline">work in progress.</span>
      </h1>

      <p>{profile.bio}</p>

      <div className="actions">
        <Link href="/projects" className="button primary">
          Explore my work
          <FiArrowUpRight aria-hidden="true" />
        </Link>

        <Link href="/about" className="button">
          A little about me
          <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <div className="hero-collage">
        <Link href="/projects/bazar-dor" className="collage-card mint">
          <span className="eyebrow">01 / EVERYDAY IMPACT</span>

          <span className="collage-emoji" aria-hidden="true">
            🥦
          </span>

          <b>Bazar Dor</b>
          <small>Everyday prices. A clearer picture.</small>
        </Link>

        <Link href="/toolbox" className="collage-card lavender">
          <span className="eyebrow">02 / THE EVERYDAY TOOLKIT</span>

          <div className="code-art">
            <i>const</i> nextStep =
            <br />
            &nbsp; <span>"keep building"</span>;
            <br />
            <em>// one idea at a time</em>
          </div>

          <b>My developer toolkit</b>
          <small>Good tools. Room to experiment.</small>
        </Link>

        <Link href="/projects/bangla-news-24" className="collage-card peach">
          <span className="eyebrow">03 / STORIES THAT MATTER</span>

          <span className="collage-emoji" aria-hidden="true">
            📰
          </span>

          <b>Bangla News 24</b>
          <small>A better read, in your own language.</small>
        </Link>
      </div>

      <div className="stack">
        <small>MADE WITH</small>

        {profile.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  );
}
