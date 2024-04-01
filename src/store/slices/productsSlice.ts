import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductsState } from '../../types/productTypes';
import { fetchProducts } from '../thunks/productsThunks';

const initialState: IProductsState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemPerPage: 5,
  totalItems: 0,
  totalPages: 0,
  currentId: null
};

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
        const products = Array.isArray(action.payload.products)
          ? action.payload.products
          : [action.payload.products];
        state.products = products;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  }
});

export const { setCurrentPage, setCurrentId } = productsSlice.actions;

export default productsSlice.reducer;
