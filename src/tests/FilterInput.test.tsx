import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { FilterInput } from '../components/Input/FilterInput';
import productsSlice from '../store/slices/productsSlice';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const store = configureStore({
  reducer: {
    products: productsSlice
  }
});

describe('FilterInput Component', () => {
  const setup = (initialEntries = ['/']) => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="*" element={<FilterInput />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('sets filter from URL on component mount', async () => {
    setup(['/products?id=123']);
    const input = (await screen.findByLabelText(
      /filter by product id/i
    )) as HTMLInputElement;
    expect(input.value).toBe('123');
  });

  test('updates URL and state on input change', async () => {
    setup(['/products']);
    const input = screen.getByLabelText(
      /filter by product id/i
    ) as HTMLInputElement;
    await userEvent.type(input, '456');
    expect(input.value).toBe('456');
  });

  test('clears the input and updates the URL when input is cleared', async () => {
    setup(['/products?id=789']);
    const input = (await screen.findByLabelText(
      /filter by product id/i
    )) as HTMLInputElement;
    await userEvent.clear(input);
    expect(input.value).toBe('');
  });
});
