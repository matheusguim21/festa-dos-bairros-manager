import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "./ui/button";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}
export function Pagination({
  pageIndex,
  totalPages,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalPages) || 1;
  return (
    <div className="flex items-center justify-between">
      <span>Total de {totalCount} items </span>
      <div className="flex- items-center gap-6 lg:gap-8">
        <div className="flex justify-center text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div>
          <Button
            className="h-8 w-8 rounded-none rounded-l-sm border-r-0 border-accent p-0"
            variant={"outline"}
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            className="h-8 w-8 border-collapse rounded-none border-r-0 border-accent p-0"
            variant={"outline"}
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            className="h-8 w-8 border-collapse rounded-none border-r-0 border-accent p-0"
            variant={"outline"}
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            className="h-8 w-8 border-collapse rounded-none rounded-r-sm border-accent p-0"
            variant={"outline"}
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
