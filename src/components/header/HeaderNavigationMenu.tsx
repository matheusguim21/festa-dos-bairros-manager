import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { NavLink } from "./nav-link";
import { Drawer, DrawerContent, DrawerOverlay } from "../ui/drawer"; // implemente um Drawer simples com Radix ou Tailwind
import { useAuth } from "@/contexts/Auth.context";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, LogOut } from "lucide-react";
import { ReactNode, useState } from "react";
import { RoleRoute, roleRoutes } from "@/routes/RoleRoutes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export function HeaderNavigationMenu() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  const items = roleRoutes[user.role].filter(
    (r): r is RoleRoute & { label: string; icon: ReactNode } =>
      Boolean(r.label && r.icon),
  );

  return (
    <header className="flex items-center justify-between py-2">
      {isMobile ? (
        <div>
          <Menu
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="h-full w-full rounded-md p-2 text-background shadow-lg"
            size={30}
          />

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerOverlay />
            <DrawerContent className="bg-white p-4">
              <div className="flex justify-end">
                <Button
                  variant={"ghost"}
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="rounded-md p-2 hover:bg-muted"
                >
                  <X size={24} />
                </Button>
              </div>

              <nav className="mt-4 flex flex-col gap-4">
                {items.map(({ path, index, label, icon }) => {
                  const to = index ? "/" : `/${path}`;
                  return (
                    <NavLink
                      key={to}
                      to={to}
                      className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      {icon}
                      {label}
                    </NavLink>
                  );
                })}

                <Button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-md p-2 text-background hover:bg-muted"
                >
                  <LogOut size={20} />
                  Sair
                </Button>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      ) : (
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-5">
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
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </header>
  );
}
