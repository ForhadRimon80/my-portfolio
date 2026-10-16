import { nav } from "@/data/navigation";
import NavLinkItem from "./NavLinkItem";

const NavLinks = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <nav aria-label="Main navigation" className={isOpen ? "nav open" : "nav"}>
      {nav.map(([href, title]) => (
        <NavLinkItem key={href} href={href} title={title} />
      ))}
    </nav>
  );
};

export default NavLinks;
