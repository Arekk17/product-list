import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IFetchProductsPayload,
  IFetchProductsResponse,
  IProduct,
  IProductsState
} from '../../types/productTypes';
interface IApiError {
  message: string;
  statusCode?: number;
}

export const fetchProducts = createAsyncThunk<
  IFetchProductsResponse,
  IFetchProductsPayload,
  { rejectValue: string }
>('products/fetchProducts', async (args, { rejectWithValue, getState }) => {
  const state = getState() as { products: IProductsState };
  try {
    const { page, filterId } = args;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      per_page: state.products.itemPerPage.toString()
    });
    if (filterId) {
      queryParams.append('id', filterId);
    }

    const response = await fetch(
      `https://reqres.in/api/products?${queryParams.toString()}`
    );
    if (!response.ok) {
      let errorMessage = 'An unknown error occurred';
      if (response.status >= 400 && response.status < 500) {
        errorMessage = 'Client error occurred';
      } else if (response.status >= 500) {
        errorMessage = 'Server error occurred';
      }
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return {
      products: data.data as IProduct[],
      totalItems: data.total,
      totalPages: data.total_pages
    };
  } catch (error) {
    const apiError = error as IApiError;
    return rejectWithValue(apiError.message || 'An unknown error occurred');
  }
});
