import { Product } from "@/types/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

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
    <Table className="overflow-auto rounded-2xl border bg-muted">
      <TableHeader className="bg-muted-foreground">
        <TableRow className="rounded-2xl">
          <TableHead className="rounded-b-none rounded-s-2xl text-background">
            Produto
          </TableHead>
          <TableHead className="text-background">Preço</TableHead>
          <TableHead className="rounded-b-none rounded-e-2xl text-background">
            Quantidade
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} accessKey={product.id.toString()}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
