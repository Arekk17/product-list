export interface IProduct {
  id: number;
  name: string;
  year: number;
  color?: string;
  pantone_value?: string;
}

export interface IProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemPerPage: number;
  totalItems: number;
  totalPages: number;
  currentId: number | null;
}

export interface IFetchProductsPayload {
  page: number;
  filterId?: string;
}

export interface IFetchProductsResponse {
  products: IProduct[];
  totalItems: number;
  totalPages: number;
}
