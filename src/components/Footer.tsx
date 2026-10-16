import BackToTop from "@/components/common/BackToTop";
import { extra, nav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { isAdmin } from "@/lib/adminAuth";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

export default async function Footer() {
  const loggedInAsAdmin = await isAdmin();

  return (
    <footer>
      <div className="footer-intro">
        <Link href="/" className="logo">
          fr<span>✳</span>
        </Link>

        <p>
          A developer, a curious mind,
          <br />
          and a work in progress.
        </p>

        <div className="social-row">
          <a href={profile.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <FaGithub aria-hidden="true" />
          </a>

          <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn aria-hidden="true" />
          </a>
        </div>

        <small>
          <Link href="/admin">
            © {new Date().getFullYear()} {profile.name}
          </Link>
        </small>
      </div>

      <div>
        <h3>Explore</h3>

        {nav.map(([url, label]) => (
          <Link key={url} href={url}>
            {label}
          </Link>
        ))}
      </div>

      <div>
        <h3>A little more</h3>

        {extra.map(([url, label]) => (
          <Link key={url} href={url}>
            {label}
          </Link>
        ))}

        {loggedInAsAdmin && <Link href="/admin">Stats</Link>}
      </div>

      <div className="footer-note">
        <span className="status">
          <i aria-hidden="true" />
          Built with curiosity
        </span>

        <p>
          Thoughtful interfaces.
          <br />
          Useful little details.
        </p>

        <BackToTop />
      </div>
    </footer>
  );
}
