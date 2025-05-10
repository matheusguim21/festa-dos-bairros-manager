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
    <Table className="rounded-2xl bg-neutral-200">
      <TableHeader className="bg-neutral-300">
        <TableRow className="rounded-2xl">
          <TableHead className="rounded-s-2xl">Produto</TableHead>
          <TableHead className="rounded-e-2xl">Preço</TableHead>
          <TableHead>Quantidade</TableHead>
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
