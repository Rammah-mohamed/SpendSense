import { useState, useMemo } from "react";

type SortOrder = "asc" | "desc";

export function useSortableData<T>(items: T[], defaultKey?: keyof T) {
  const [sortKey, setSortKey] = useState<keyof T | null>(defaultKey ?? null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: keyof T) => {
    const isAsc = sortKey === key && sortOrder === "asc";
    setSortKey(key);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return items;

    return [...items].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (aVal instanceof Date && bVal instanceof Date) {
        return sortOrder === "asc"
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime();
      }

      return 0;
    });
  }, [items, sortKey, sortOrder]);

  return {
    sortedData,
    sortKey,
    sortOrder,
    handleSort,
  };
}
