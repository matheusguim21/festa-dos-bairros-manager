import { AddProductModal } from "@/components/modals/AddProductModal";
import StockTable from "@/components/tables/StockTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/utils/fakerjs/products";
import { Plus, Search } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function Stock() {
  return (
    <main className="flex flex-col gap-5 px-16">
      <Helmet title="Estoque" />
      <section className="mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-muted-foreground">Estoque</h1>
      </section>

      <section>
        <div className="flex">
          <div className="flex flex-1 flex-row justify-between border-0">
            <div className="flex w-96 items-center gap-4 rounded-xl border bg-secondary px-3">
              <Input
                className="border-0 placeholder:text-gray-400"
                placeholder="nome ou código do produto"
              />
              <Search className="cursor-pointer text-gray-400" />
            </div>
            <AddProductModal />
          </div>
        </div>
      </section>
      <section>
        <StockTable products={products} />
      </section>
    </main>
  );
}
