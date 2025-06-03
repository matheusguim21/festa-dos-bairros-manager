// src/hooks/useDebouncedValue.ts
import { useState, useEffect } from "react";

/**
 * useDebouncedValue: recebe um valor de entrada e só o atualiza
 * após o “delay” em ms ter passado sem que o valor original mude.
 *
 * @param value - valor que será “debounced” (pode ser string, number, objeto, etc)
 * @param delay - tempo em ms para aguardar antes de atualizar o valor “debounced”
 * @returns o valor dado, mas que só muda após o debounce
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Cria um timeout que só executa após “delay” ms
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Se value mudar antes de “delay” ms, limpa o timeout anterior
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
