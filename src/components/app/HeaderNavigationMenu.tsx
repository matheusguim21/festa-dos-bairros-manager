import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Box, Home } from "lucide-react";
import { NavLink } from "./nav-link";
import logoFesta from "@/assets/logo-festa.png";

export function HeaderNavigationMenu() {
  return (
    <NavigationMenu className="flex items-center justify-between bg-primary px-5">
      <img src={logoFesta} width={50} height={30} />
      <NavigationMenuList className="flex gap-10 p-5">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink to={"/estoque"}>
              <Box />
              <span>Estoque</span>
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink to={"/vendas"}>
              <Box />
              <span>Vendas</span>
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
