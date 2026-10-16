"use client";

import { extra, nav } from "@/data/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiSearch, FiX } from "react-icons/fi";

const CommandMenu = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const previousFocus = useRef<HTMLElement | null>(null);
  const filteredLinks = [...nav, ...extra].filter(([, title]) =>
    title.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <dialog
        open
        className="command"
        aria-label="Search pages"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls =
            event.currentTarget.querySelectorAll<HTMLElement>("input,button,a");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="search-row">
          <FiSearch />
          <input
            autoFocus
            aria-label="Search pages"
            placeholder="Where would you like to go?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="icon-button"
            aria-label="Close search"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        <div className="command-results">
          {filteredLinks.map(([href, title]) => (
            <Link key={href} href={href} onClick={onClose}>
              {title}
              <FiArrowUpRight />
            </Link>
          ))}
          {filteredLinks.length === 0 && <p>No pages found.</p>}
        </div>
      </dialog>
    </div>
  );
};

export default CommandMenu;
