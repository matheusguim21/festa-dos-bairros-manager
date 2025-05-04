import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { AddStockItemForm } from "../inputs/AddStockItemForm";
import { useState } from "react";

export function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>
          <Plus size={20} className="text-background" />
          <span className="uppercase text-muted">adicionar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-fit items-center px-10">
        <DialogHeader>
          <DialogTitle>Adicone um produto</DialogTitle>
          <DialogDescription>
            Preencha as informações e clique em Salvar
          </DialogDescription>
        </DialogHeader>
        <AddStockItemForm handleCloseModal={handleCloseModal} />
      </DialogContent>
    </Dialog>
  );
}
