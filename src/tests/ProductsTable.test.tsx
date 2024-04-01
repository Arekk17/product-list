import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../store/slices/productsSlice';
import { ProductsTable } from '../components/ProductTable/ProductTable';
import { IProductsState } from '../types/productTypes';

const mockProducts = [
  { id: 1, name: 'cerulean', year: 2000 },
  { id: 2, name: 'fuchsia rose', year: 2001 },
  { id: 3, name: 'true red', year: 2002 },
  { id: 4, name: 'aqua sky', year: 2003 },
  { id: 5, name: 'tigerlily', year: 2004 }
];
interface RootState {
  products: IProductsState;
}
const renderWithReduxAndRouter = (initialState: RootState) => {
  const store = configureStore({
    reducer: { products: productsSlice },
    preloadedState: initialState
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ProductsTable />
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductsTable', () => {
  test('renders with loading state', async () => {
    renderWithReduxAndRouter({
      products: {
        products: [],
        loading: true,
        error: null,
        currentPage: 1,
        itemPerPage: 5,
        totalItems: 0,
        totalPages: 0,
        currentId: null
      }
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  test('renders products from Redux state', async () => {
    renderWithReduxAndRouter({
      products: {
        products: mockProducts,
        loading: false,
        error: null,
        currentPage: 1,
        itemPerPage: 5,
        totalItems: 0,
        totalPages: 0,
        currentId: null
      }
    });

    for (const product of mockProducts) {
      await expect(
        screen.findByText(product.name)
      ).resolves.toBeInTheDocument();
    }
  });

  test('opens modal on row click', async () => {
    renderWithReduxAndRouter({
      products: {
        products: mockProducts,
        loading: false,
        error: null,
        currentPage: 1,
        itemPerPage: 5,
        totalItems: 0,
        totalPages: 0,
        currentId: null
      }
    });
    await waitFor(() =>
      expect(screen.getByText('cerulean')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText('cerulean'));
    await waitFor(() => {
      expect(screen.getByText('Product Details')).toBeInTheDocument();
    });
  });
});
