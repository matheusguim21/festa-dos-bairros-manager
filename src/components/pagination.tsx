import { generatePageRange } from "@/lib/pagination-range";

import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  pageIndex,
  pageCount,
  onPageChange,
}: PaginationProps) {
  const items = generatePageRange(pageIndex, pageCount);

  function renderItem(item: number | "ellipsis", idx: number) {
    if (item === "ellipsis") {
      return (
        <PaginationItem key={`ellipsis-${idx}`}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    const num = item;
    const active = num === pageIndex;
    return (
      <PaginationItem key={num}>
        <PaginationLink
          href="#"
          isActive={active}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(num);
          }}
        >
          {num + 1}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <ShadPagination className="flex items-center justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.max(0, pageIndex - 1));
            }}
            aria-disabled={pageIndex === 0}
            className={pageIndex === 0 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {items.map(renderItem)}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.min(pageIndex + 1, pageCount - 1));
            }}
            aria-disabled={pageIndex + 1 >= pageCount}
            className={
              pageIndex + 1 >= pageCount ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  );
}
