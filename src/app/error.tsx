"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="empty">
      <h1>A little interruption.</h1>
      <p>Something went wrong while loading this page.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
