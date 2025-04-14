import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { AddProducForm } from "../inputs/AddProductForm";
import { useState } from "react";

export function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Dialog modal open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <Button>
          <Plus size={20} />
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
        <AddProducForm handleCloseModal={handleCloseModal} />
      </DialogContent>
    </Dialog>
  );
}
