import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FichasTab } from "../../../components/cashier/Tokentab";
import { CashierSummary } from "../../../components/cashier/CashierSummary";
import { ProdutosTab } from "../../../components/cashier/ProductTab";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function CashierPage() {
  return (
    <div>
      <div className="flex h-full overflow-hidden">
        <Helmet title="Caixa" />

        {/* Lado esquerdo: abas de Fichas/Produtos */}
        <div className="flex flex-1 flex-col pt-5">
          {/* Lista de abas (sempre visível no topo) */}
          <Tabs defaultValue="fichas" className="flex flex-col">
            <TabsList className="self-center border-b">
              <TabsTrigger value="fichas">Fichas</TabsTrigger>
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
            </TabsList>

            {/* Conteúdo das abas ocupa todo o espaço restante e tem overflow */}
            <TabsContent value="fichas" className="flex justify-center">
              <FichasTab />
            </TabsContent>

            <TabsContent value="produtos" className="flex-1 overflow-auto p-4">
              <ProdutosTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Lado direito: Resumo da venda */}
        <div className="static right-0 flex w-80 min-w-60 flex-col border-l p-6">
          <CashierSummary />
        </div>
      </div>
    </div>
  );
}
