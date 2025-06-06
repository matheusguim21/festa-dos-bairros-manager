import { NavLink } from "react-router";
import { HeaderNavigationMenu } from "./HeaderNavigationMenu";
import logoFesta from "@/assets/logo-festa.png";

export function Header({ navBar }: { navBar?: boolean }) {
  return (
    <div className="flex items-center justify-between bg-primary px-5">
      <NavLink to={"/"}>
        <img src={logoFesta} width={50} height={30} />
      </NavLink>
      {navBar && <HeaderNavigationMenu />}
    </div>
  );
}
