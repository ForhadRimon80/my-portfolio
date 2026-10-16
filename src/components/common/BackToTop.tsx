"use client";

const BackToTop = () => {
  const handleClick = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  };
  return (
    <button className="text-button" onClick={handleClick}>
      Back to top ↑
    </button>
  );
};

export default BackToTop;
