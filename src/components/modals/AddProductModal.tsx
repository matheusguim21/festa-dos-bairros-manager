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
import { useState } from "react";
import { AddProductForm } from "../forms/AddProductForm";

export function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className="h-11 xs:w-full md:max-w-[300px]"
        onClick={() => setIsOpen(true)}
        asChild
      >
        <Button>
          <Plus size={20} className="text-background" />
          <span className="uppercase text-background">Novo Produto</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-fit items-center px-10">
        <DialogHeader>
          <DialogTitle>Adicone um produto</DialogTitle>
          <DialogDescription>
            Preencha as informações e clique em Salvar
          </DialogDescription>
        </DialogHeader>
        <AddProductForm handleCloseModal={handleCloseModal} />
      </DialogContent>
    </Dialog>
  );
}
