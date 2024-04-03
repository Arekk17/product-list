import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaginationComponent } from '../components/Pagination/Pagination';
import * as reduxHooks from '../store/store';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));
jest.mock('../store/store', () => ({
  useAppSelector: jest.fn()
}));

describe('PaginationComponent Tests', () => {
  test('renders correctly and can change pages', async () => {
    const mockUseAppSelector = reduxHooks.useAppSelector as jest.Mock;
    mockUseAppSelector.mockReturnValue({ totalPages: 5, currentPage: 1 });

    const mockNavigate = jest.fn();
    (
      jest.requireMock('react-router-dom').useNavigate as jest.Mock
    ).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <PaginationComponent />
      </BrowserRouter>
    );

    const nextPageButton = screen.getByRole('button', { name: 'Go to page 2' });
    await userEvent.click(nextPageButton);

    expect(mockNavigate).toHaveBeenCalledWith('/products?page=2', {
      replace: true
    });
  });
});
