export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemPerPage: number;
  totalItems: number;
  totalPages: number;
  currentId: number | null;
}

export interface FetchProductsPayload {
  page: number;
  filterId?: string;
}

export interface FetchProductsResponse {
  products: Product[];
  totalItems: number;
  totalPages: number;
}
