"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLinkItem {
  href: string;
  title: string;
}

const NavLinkItem = ({ href, title }: INavLinkItem) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      className={isActive ? "active" : ""}
      aria-current={isActive ? "page" : undefined}
    >
      {title}
    </Link>
  );
};

export default NavLinkItem;
