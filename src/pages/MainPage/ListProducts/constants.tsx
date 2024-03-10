import { ColumnType } from "../../../Components/Table/types";
import { CategoryItem } from "./types";

export const columns: ColumnType<CategoryItem>[] = [
  {
    title: "Id",
    value: "id",
  },
  {
    title: "Название",
    value: "product",
  },
  {
    title: "Цена ",
    value: "price",
  },
  {
    title: "бренд",
    value: "brand",
  },
];
