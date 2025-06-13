"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Search, Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiltersFormData } from "@/types/schemas/reports-filter-schema";
import { Stall } from "@/types/Stall";

interface FiltersSectionProps {
  form: UseFormReturn<FiltersFormData>;
  stalls: Stall[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function FiltersSection({
  form,
  stalls,
  hasActiveFilters,
  clearFilters,
}: FiltersSectionProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              !
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1 text-muted-foreground"
          >
            <X className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      {/* Filters Card */}
      <Card className={`${showFilters ? "block" : "hidden"} sm:block`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              Filtros e Ordenação
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(false)}
              className="sm:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              {/* Search */}
              <FormField
                control={form.control}
                name="searchTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buscar produto</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Digite o nome do produto..."
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Filters Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stall Filter */}
                <FormField
                  control={form.control}
                  name="stallId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barraca</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Todas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              Todas as barracas
                            </SelectItem>
                            {stalls.map((stall) => (
                              <SelectItem
                                key={stall.id}
                                value={stall.id.toString()}
                              >
                                {stall.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Sort */}
                <FormField
                  control={form.control}
                  name="sortBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ordenar por</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="totalSold">
                              Mais vendidos
                            </SelectItem>
                            <SelectItem value="revenue">
                              Maior receita
                            </SelectItem>
                            <SelectItem value="name">Nome (A-Z)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Clear Filters - Desktop */}
                <div className="hidden items-end sm:flex lg:col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>

              {/* Clear Filters - Mobile */}
              <div className="sm:hidden">
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
