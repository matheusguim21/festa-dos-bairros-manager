import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, LinkProps, useLocation } from "react-router";

export type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  return (
    <Link
      data-current={props.to === pathname}
      {...props}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground",
        isMobile
          ? "data-[current=true]:text-primary"
          : "data-[current=true]:text-background",
      )}
    />
  );
}
