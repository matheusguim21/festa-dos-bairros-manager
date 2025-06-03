import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { NavLink } from "./nav-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/contexts/Auth.context";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogOut } from "lucide-react";
import { ReactNode, useState } from "react";
import { RoleRoute, roleRoutes } from "@/routes/RoleRoutes";

export function HeaderNavigationMenu() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  // Pega só as rotas que têm label e icon (menu) para o role atual
  const items = roleRoutes[user.role].filter(
    (r): r is RoleRoute & { label: string; icon: ReactNode } =>
      Boolean(r.label && r.icon),
  );

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-5 p-5">
        {isMobile ? (
          <NavigationMenuItem>
            <DropdownMenu open={open}>
              <DropdownMenuTrigger
                className="flex items-center gap-2 rounded-md border bg-muted px-3 py-2"
                onClick={() => setOpen(true)}
              >
                {user.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {items.map(({ path, index, label, icon }) => {
                  const to = index ? "/" : `/${path}`;
                  return (
                    <DropdownMenuItem className="min-w-24" key={to}>
                      <NavigationMenuLink asChild className="flex">
                        <NavLink
                          className="border border-red-500"
                          to={to}
                          onClick={() => setOpen(false)}
                        >
                          {icon}
                          <span>{label}</span>
                        </NavLink>
                      </NavigationMenuLink>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuItem
                  onClick={signOut}
                  className="flex items-center gap-2"
                >
                  <LogOut size={20} />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        ) : (
          <>
            {items.map(({ path, index, label, icon }) => {
              const to = index ? "/" : `/${path}`;
              return (
                <NavigationMenuItem key={to}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={to}
                      className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted"
                    >
                      {icon}
                      <span>{label}</span>
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-md border bg-muted px-3 py-2">
                  {user.name}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={signOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut size={20} />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
