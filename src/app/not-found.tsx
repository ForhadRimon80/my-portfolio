import Link from "next/link";
export default function NotFound() {
  return (
    <div className="empty">
      <span className="eyebrow">404 · A WRONG TURN</span>
      <h1>This corner is still empty.</h1>
      <p>That page doesn’t exist. There’s plenty to explore back home.</p>
      <Link href="/" className="button primary">
        Take me home ↗
      </Link>
    </div>
  );
}
