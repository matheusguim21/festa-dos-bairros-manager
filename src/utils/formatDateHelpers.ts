// Utilitários para trabalhar com datas no fuso horário brasileiro

/**
 * Cria uma data no fuso horário local (Brasil) a partir de uma string YYYY-MM-DD
 */
export function createLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // month - 1 porque Date usa 0-11
}

/**
 * Formata uma data para o padrão brasileiro, garantindo o fuso horário correto
 */
export function formatDateBR(dateString: string): string {
  const date = createLocalDate(dateString);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });
}

/**
 * Formata uma data de forma segura, sem depender de fuso horário
 */
export function formatDateSafe(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const monthIndex = Number.parseInt(month) - 1;
  return `${Number.parseInt(day)} de ${monthNames[monthIndex]} de ${year}`;
}

/**
 * Converte uma data para o formato ISO considerando o fuso horário brasileiro
 */
export function toISOStringBR(date: Date): string {
  // Ajusta para o fuso horário de Brasília (UTC-3)
  const brazilOffset = -3 * 60; // -3 horas em minutos
  const localTime = date.getTime();
  const localOffset = date.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const brazilTime = new Date(utc + brazilOffset * 60000);

  return brazilTime.toISOString().split("T")[0]; // Retorna apenas YYYY-MM-DD
}
