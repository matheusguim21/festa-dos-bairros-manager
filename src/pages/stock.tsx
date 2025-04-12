import StockTable from "@/components/stock/StockTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/utils/fakerjs/products";
import { Plus, Search } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function Stock(){



  return(
    <main className="px-16 gap-5 flex flex-col">
        <Helmet
            title="Estoque"
              />
      <section className="flex mx-auto flex-col items-center">
        <h1 className="text-3xl font-bold text-muted-foreground">Estoque</h1>
      </section>

      <section>
        <div className="flex">
       <div className="flex-row flex border-0 justify-between flex-1">
         <div className="flex border w-96 bg-secondary rounded-xl items-center px-3 gap-4"> 
          <Input  className="border-0 placeholder:text-gray-400" placeholder="nome ou código do produto" />
          <Search className="text-gray-400 cursor-pointer"/>
          </div>
            <Button >
              <Plus size={20}/>
              <span className="uppercase text-muted">adicionar</span>
            </Button>
       </div>
        </div>
       </section>
       <section>
        <StockTable products={products}/>
       </section>
    </main>
  )
}