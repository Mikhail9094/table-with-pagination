export interface CategoryItem {
  id: string;
  product: string;
  price: number;
  brand: string | null;
}

export enum TCategories {
  EMPTY = "",
  PRODUCT = "Продукты",
  PRICE = "Цена",
  BRAND = "Бренд",
}

export interface TSearch {
  category: TCategories;
  searchText: string;
}
