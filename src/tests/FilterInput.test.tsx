import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import ProductFilter from '../components/Input/FilterInput';
import productsSlice from '../store/slices/productsSlice';

const store = configureStore({
  reducer: {
    products: productsSlice
  }
});

describe('ProductFilter Component', () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <ProductFilter />
      </Provider>
    );

  test('allows numeric input and dispatches setCurrentId with the number', async () => {
    setup();
    const input = screen.getByLabelText(/filter by product id/i);
    await userEvent.type(input, '123');
    expect(input).toHaveValue(123);
    expect(store.getState().products.currentId).toEqual(123);
  });

  test('ignores non-numeric input', async () => {
    setup();
    const input = screen.getByLabelText(/filter by product id/i);
    await userEvent.type(input, 'abc');
    expect(input).toHaveValue(null);
  });

  test('clears the input and dispatches setCurrentId with null', async () => {
    setup();
    const input = screen.getByLabelText(/filter by product ID/i);
    await userEvent.type(input, '123');
    await userEvent.clear(input);
    expect(input).toHaveValue(null);
    expect(store.getState().products.currentId).toBeNull();
  });
});
