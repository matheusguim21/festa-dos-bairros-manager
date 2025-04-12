import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface Props {
  products:{
  id: string;
  
  nome: string;
  unidade: string;
  quantidade: number;
}[]
}

export default function StockTable({products}:Props) {

  

  return (
   <Table className="bg-neutral-200 rounded-2xl">
    <TableHeader className="bg-neutral-300  ">
      <TableRow className="rounded-2xl" >
        <TableHead className=" rounded-s-2xl" >Produto</TableHead>
        <TableHead>Quantidade</TableHead>
        <TableHead className=" rounded-e-2xl">unidade medida</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((product)=>(
        <TableRow>
          <TableCell>{product.nome}</TableCell>
          <TableCell>{product.quantidade}</TableCell>
          <TableCell>{product.unidade}</TableCell>
        </TableRow>
      ))}
    </TableBody>
   </Table>
  )
}
