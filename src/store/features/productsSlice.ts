import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  ProductsState,
  FetchProductsPayload,
  FetchProductsResponse,
  Product
} from '../../types/productTypes';

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemPerPage: 5,
  totalItems: 0,
  totalPages: 0,
  currentId: null
};

export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  FetchProductsPayload,
  { rejectValue: string }
>('products/fetchProducts', async (args, { rejectWithValue, getState }) => {
  const state = getState() as { products: ProductsState };
  try {
    const { page, filterId } = args;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      per_page: state.products.itemPerPage.toString()
    });
    if (filterId) {
      queryParams.append('id', filterId.toString());
    }

    const response = await fetch(
      `https://reqres.in/api/products?${queryParams.toString()}`
    );
    console.log(response);
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
      products: data.data as Product[],
      totalItems: data.total,
      totalPages: data.total_pages
    };
  } catch (error: any) {
    return rejectWithValue(error.message || 'An unknown error occurred');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCurrentId(state, action: PayloadAction<number | null>) {
      state.currentId = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        // Set the error to the error message
        state.error = action.payload || 'Failed to fetch products';
      });
  }
});

export const { setCurrentPage, setCurrentId } = productsSlice.actions;

export default productsSlice.reducer;
