import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from '../store/store';
import { PaginationComponent } from '../components/Pagination/Pagination';
import { setCurrentPage } from '../store/slices/productsSlice';

jest.mock('../store/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn()
}));

describe('PaginationComponent Tests', () => {
  test('renders correctly and can change pages', async () => {
    const mockUseAppSelector = reduxHooks.useAppSelector as jest.Mock;
    mockUseAppSelector.mockReturnValue({ totalPages: 5, currentPage: 1 });
    const mockDispatch = jest.fn();
    const mockUseAppDispatch = reduxHooks.useAppDispatch as jest.Mock;
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    render(<PaginationComponent />);
    const nextPageButton = screen.getByRole('button', { name: 'Go to page 2' });
    await waitFor(() => userEvent.click(nextPageButton));
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentPage(2));
  });
});
