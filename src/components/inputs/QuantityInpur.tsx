"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "success" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
}

export function QuantityInput({
  value,
  onChange,
  min = 0,
  max = 999999,
  step = 1,
  disabled = false,
  className,
  variant = "default",
  size = "md",
  placeholder = "0",
}: QuantityInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputValue(inputVal);

    // Allow empty input for better UX
    if (inputVal === "") {
      onChange(0);
      return;
    }

    const numValue = Number.parseInt(inputVal, 10);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onChange(clampedValue);
    }
  };

  const handleInputBlur = () => {
    // Ensure input shows the actual value on blur
    setInputValue(value.toString());
  };

  const sizeClasses = {
    sm: {
      container: "h-9",
      button: "h-9 w-9 text-sm",
      input: "h-9 text-sm",
    },
    md: {
      container: "h-11",
      button: "h-11 w-11",
      input: "h-11 text-base",
    },
    lg: {
      container: "h-13",
      button: "h-13 w-13 text-lg",
      input: "h-13 text-lg",
    },
  };

  const variantClasses = {
    default: {
      button: "border-input hover:bg-accent hover:text-accent-foreground",
      input: "border-input focus-visible:ring-ring",
    },
    success: {
      button:
        "border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800",
      input: "border-green-500 focus-visible:ring-green-500",
    },
    destructive: {
      button: "border-red-500 text-red-700 hover:bg-red-50 hover:text-red-800",
      input: "border-red-500 focus-visible:ring-red-500",
    },
    outline: {
      button: "border-input hover:bg-accent hover:text-accent-foreground",
      input: "border-input focus-visible:ring-ring",
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  return (
    <div className={cn("flex items-center", currentSize.container, className)}>
      {/* Decrement Button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={disabled || value <= min}
        onClick={handleDecrement}
        className={cn(
          "rounded-r-none border-r-0 transition-all hover:border-r",
          currentSize.button,
          currentVariant.button,
          disabled || value <= min
            ? "cursor-not-allowed opacity-50"
            : "hover:scale-105 active:scale-95",
        )}
      >
        <Minus className="h-4 w-4" />
      </Button>

      {/* Input Field */}
      <Input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        min={min}
        max={max}
        placeholder={placeholder}
        className={cn(
          "rounded-none border-x-0 text-center font-medium tabular-nums transition-all focus-visible:z-10",
          currentSize.input,
          currentVariant.input,
          "[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        )}
      />

      {/* Increment Button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={disabled || value >= max}
        onClick={handleIncrement}
        className={cn(
          "rounded-l-none border-l-0 transition-all hover:border-l",
          currentSize.button,
          currentVariant.button,
          disabled || value >= max
            ? "cursor-not-allowed opacity-50"
            : "hover:scale-105 active:scale-95",
        )}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
