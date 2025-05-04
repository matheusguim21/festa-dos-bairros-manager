import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Props {
  products: {
    id: number;

    name: string;
    unit: string;
    quantity: number;
  }[];
}

export default function StockTable({ products }: Props) {
  return (
    <Table className="rounded-2xl bg-neutral-200">
      <TableHeader className="bg-neutral-300">
        <TableRow className="rounded-2xl">
          <TableHead className="rounded-s-2xl">Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead className="rounded-e-2xl">unidade medida</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} accessKey={product.id.toString()}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.unit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
