import { Product } from "@/types/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  data: Product[];
}

export default function ProductsTable({ data }: Props) {
  const products = data.map((product) => {
    return {
      ...product,
      price: new Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
      }).format(product.price),
    };
  });
  return (
    <Table className="overflow-auto bg-muted">
      <TableHeader className="bg-muted-foreground">
        <TableRow>
          <TableHead className="rounded-s text-lg text-background">
            Produto
          </TableHead>
          <TableHead className="text-lg text-background">Preço</TableHead>
          <TableHead className="text-lg text-background">Quantidade</TableHead>
          <TableHead className="rounded-e text-lg text-background"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} accessKey={product.id.toString()}>
            <TableCell className="rounded-s text-lg">{product.name}</TableCell>
            <TableCell className="text-lg">{product.price}</TableCell>
            <TableCell className="text-lg">{product.quantity}</TableCell>
            <TableCell className="rounded-e">
              <div className="w-fit rounded-md bg-primary p-1 text-background">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Pencil className="text-background" />
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Editar Item</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
