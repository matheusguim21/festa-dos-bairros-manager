import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import {
  ChevronDown,
  BadgeDollarSign,
  Box,
  Computer,
  LogOut,
} from "lucide-react";
import { NavLink } from "./nav-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/contexts/Auth.context";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeaderNavigationMenu() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-5 p-5">
        {isMobile ? (
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center rounded-md border border-background bg-muted px-2">
                <span> {user!.name}</span> <ChevronDown size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <NavigationMenuLink
                    href="/estoque"
                    className="flex w-full gap-2"
                  >
                    <Box size={20} />
                    <span>Estoque</span>
                  </NavigationMenuLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavigationMenuLink
                    href="/vendas"
                    className="flex w-full gap-2"
                  >
                    <BadgeDollarSign size={20} />
                    <span>Vendas</span>
                  </NavigationMenuLink>
                </DropdownMenuItem>
                {user?.role === "ADMIN" ? (
                  <DropdownMenuItem>
                    <NavigationMenuLink
                      href="/caixa"
                      className="flex w-full gap-2"
                    >
                      <Computer size={20} />
                      <span>Caixa</span>
                    </NavigationMenuLink>
                  </DropdownMenuItem>
                ) : null}

                <DropdownMenuItem onClick={() => signOut()}>
                  Sair <LogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        ) : (
          <>
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
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md border border-background bg-muted px-2">
                {user!.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sair <LogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
