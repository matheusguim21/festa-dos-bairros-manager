import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSaleStore } from "@/store/SaleStore";
import { Separator } from "../ui/separator";

export function SaleSummaryBar() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { items, clear } = useSaleStore();
  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) return null;

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-muted bg-white p-4 shadow-xl">
        <div className="flex justify-between">
          <div className="flex w-[50%] flex-wrap justify-start">
            <strong className="flex-1">
              {items.length} produto{items.length > 1 && "(s)"}
            </strong>{" "}
            selecionado{items.length > 1 && "(s)"}
            <br />
            <div>
              <span> Total: </span>
              <span className="font-bold">{numberFormatter.format(total)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              type="reset"
              variant={"outline"}
              className="border-red-500 bg-background text-red-500"
              onClick={clear}
            >
              Cancelar venda
            </Button>
            <Button
              onClick={() => setOpen(true)}
              className="rounded-md bg-primary px-4 py-2 text-white"
            >
              Finalizar Venda
            </Button>
          </div>
        </div>
      </div>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Resumo da venda</DrawerTitle>
          <DrawerDescription>
            Revise a venda e clique em Confirmar
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-1 px-4">
          <div>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between py-2">
                <div className="flex gap-2">
                  <span>{item.quantity}x</span>
                  <span>{item.product.name}</span>
                </div>
                <div className="flex min-w-[80px] justify-end gap-1">
                  <span className="text-right">R$</span>
                  <span className="w-[50px] text-right font-mono tabular-nums">
                    {numberFormatter
                      .format(item.product.price)
                      .replace("R$", "")
                      .trim()}
                  </span>
                </div>
              </div>
            ))}
            <div className="mt-3 flex justify-between">
              <span className="font-bold">Total: {""} </span>
              <span className="font-serif text-xl text-primary">
                {numberFormatter.format(total)}
              </span>
            </div>
          </div>
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
          <Button className="text-background">Confirmar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
