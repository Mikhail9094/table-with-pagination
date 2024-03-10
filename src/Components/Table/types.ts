import { ReactNode } from "react";

export interface TableProps<T> {
  title?: string;
  data: T[];
  columns: ColumnType<T>[];
  children?: ReactNode;
}

export interface ColumnType<T> {
  title: string;
  value: keyof T | ((item: T) => any);
}
