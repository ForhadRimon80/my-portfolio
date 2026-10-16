"use client";

import { profile } from "@/data/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import CommandMenu from "./CommandMenu";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen((isOpen) => !isOpen);
      }
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="header">
        <Link href="/" className="logo" aria-label="Farhad Rimon home">
          fr<span>✳</span>
        </Link>
        <NavLinks isOpen={menuOpen} />
        <div className="header-actions">
          <button
            className="icon-button search-button"
            aria-label="Open navigation search"
            onClick={() => setSearchOpen(true)}
          >
            <FiSearch />
          </button>
          <a className="social" href={profile.github} aria-label="GitHub">
            <FaGithub />
          </a>
          <a className="social" href={profile.linkedin} aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <ThemeToggle />
          <button
            className="icon-button mobile-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
      {searchOpen && <CommandMenu onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Header;
