import axios from "axios";

interface Filters {
  searchTerm?: string;
  stallId?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
  festivalDay: string;
}

export async function downloadExcelReport({
  debouncedFilters,
}: {
  debouncedFilters: Filters;
}) {
  const url = new URL(
    `${import.meta.env.VITE_API_URL}/reports/best-selling-products/excel`,
  );

  url.searchParams.set("page", "0");
  url.searchParams.set("limit", "1000");

  if (debouncedFilters.searchTerm)
    url.searchParams.set("search", debouncedFilters.searchTerm);

  if (debouncedFilters.stallId && debouncedFilters.stallId !== "all")
    url.searchParams.set("stallId", debouncedFilters.stallId);

  if (debouncedFilters.sortBy)
    url.searchParams.set("sortBy", debouncedFilters.sortBy);
  if (debouncedFilters.festivalDay && debouncedFilters.festivalDay !== "all")
    url.searchParams.set("date", debouncedFilters.festivalDay);

  try {
    const response = await axios.get(url.toString(), {
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "produtos-mais-vendidos.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Erro ao baixar relatório Excel:", error);
    alert("Erro ao gerar o relatório. Verifique a conexão ou tente novamente.");
  }
}
