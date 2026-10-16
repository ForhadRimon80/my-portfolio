import PageHeading from "@/components/common/PageHeading";
import { profile } from "@/data/profile";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
export const metadata = { title: "About" };
export default function About() {
  return (
    <>
      <PageHeading
        label="BEHIND THE SCREEN"
        title="A curious mind. A builder at heart."
        description="Hi, I’m Farhad Rimon. I like making the web a little more useful, one project at a time."
      />
      <div className="about-layout">
        <div className="about-art lavender">
          <div className="large-monogram">
            fr<span>✳</span>
          </div>
          <span className="eyebrow">BASED IN BANGLADESH</span>
          <p>Code. Learn. Repeat.</p>
        </div>
        <div className="prose">
          <h2>From an idea to something real.</h2>
          <p>{profile.bio}</p>
          <p>
            My background is in Computer Science and Engineering at Daffodil
            International University. I’ve also worked as a junior frontend
            developer at TMT SOFT in 2023.
          </p>
          <p>
            I’m interested in how data and good interfaces can help people
            understand the world around them. For now, I’m building with the web
            and keeping an open notebook as I learn.
          </p>
          <div className="tags">
            {profile.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <Link href="/contact" className="button primary">
            Let’s connect
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
      <section className="section">
        <h2>A few things I care about.</h2>
        <div className="three-grid">
          {[
            [
              "Clarity",
              "An interface should help someone find their next step.",
            ],
            [
              "Curiosity",
              "Understanding why something works matters as much as making it work.",
            ],
            ["Progress", "Small, useful improvements add up over time."],
          ].map(([a, b]) => (
            <div className="card" key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
