import { LoginFilters } from "@/components/filters/LoginFilters";
import logoFesta from "@/assets/logo-festa.png";

export function Login() {
  return (
    <main className="grid grid-cols-2">
      <section className="flex h-[100vh] items-center justify-center bg-primary">
        <img src={logoFesta} width={300} height={100} />
      </section>
      <div className="flex h-[100vh] flex-1 flex-col items-center justify-center gap-10 px-5">
        <div className="-mt-10 w-96">
          <h1 className="text-2xl font-bold">Faça login</h1>
          <LoginFilters />
        </div>
      </div>
    </main>
  );
}
