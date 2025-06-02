// src/components/caixa/FichasTab.tsx
import { FICHAS, FichaValue, fichaColorMap } from "@/types/TokenSales";
import { useCaixaStore } from "@/store/useCashierStore";
import { Button } from "@/components/ui/button";

export function FichasTab() {
  const addItem = useCaixaStore((state) => state.addItem);

  const handleAddFicha = (valor: FichaValue) => {
    addItem({
      id: `ficha-${valor}`,
      nome: `Ficha R$ ${valor.toFixed(2)}`,
      preco: valor,
      tipo: "ficha",
    });
  };

  return (
    <div className="grid w-fit grid-cols-3 gap-4 self-center">
      {FICHAS.map((valor) => (
        <Button
          key={valor}
          onClick={() => handleAddFicha(valor)}
          className={` ${fichaColorMap[valor]} /* cor dinâmica */ /* deixa quadrado */ /* tamanho fixo (pode ajustar) */ /* texto em branco */ /* fonte maior */ flex aspect-square h-24 w-24 items-center justify-center text-lg font-bold text-white`}
        >
          R$ {valor}
        </Button>
      ))}
    </div>
  );
}
