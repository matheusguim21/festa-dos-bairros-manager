import { LoginFilters } from "@/components/filters/LoginFilters";
import logoFesta from "@/assets/logo-festa.png";
import { useIsMobile } from "@/hooks/use-mobile";

export function Login() {
  const isMobile = useIsMobile();

  return (
    <main
      className={
        isMobile
          ? "flex min-h-screen flex-col items-center bg-background"
          : "grid grid-cols-2"
      }
    >
      <section
        className={
          isMobile
            ? "flex w-full items-center justify-center bg-background px-5 py-10"
            : "flex h-[100vh] items-center justify-center bg-primary"
        }
      >
        <img
          src={logoFesta}
          width={isMobile ? 100 : 300}
          height={isMobile ? 100 : 300}
        />
      </section>

      <div
        className={
          isMobile
            ? "flex flex-col items-center justify-center gap-10 px-5 py-10"
            : "flex h-[100vh] flex-1 flex-col items-center justify-center gap-10 px-5"
        }
      >
        <div className="w-96 max-w-full px-5">
          <h1 className="text-2xl font-bold">Faça login</h1>
          <LoginFilters />
        </div>
      </div>
    </main>
  );
}
