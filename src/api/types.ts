export interface TIds {
  offset: number;
  limit: number;
}

export interface TProducts {
  ids: string[];
}

export interface TFields {
  field: string;
  offset?: number;
  limit?: number;
}

export enum Action {
  GET_IDS = "get_ids",
  GET_ITEMS = "get_items",
  GET_FIELDS = "get_fields",
  FILTER = "filter",
}

export interface TFilterPrice {
  price: number;
}
export interface TFilterBrand {
  brand: string;
}
export interface TFilterProduct {
  product: string;
}
