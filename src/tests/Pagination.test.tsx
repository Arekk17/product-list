import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('initially renders the correct number of page buttons', () => {
    const totalPages = 5;
    const mockUseAppSelector = reduxHooks.useAppSelector as jest.Mock;
    mockUseAppSelector.mockReturnValue({ totalPages, currentPage: 1 });

    render(
      <BrowserRouter>
        <PaginationComponent />
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole('button');
    const pageNumberButtons = buttons.filter(button => {
      const number = parseInt(button.textContent || '', 10);
      return !isNaN(number) && number <= totalPages;
    });

    expect(pageNumberButtons).toHaveLength(totalPages);
  });

  test('navigates to the correct page when a page button is clicked', async () => {
    const mockUseAppSelector = reduxHooks.useAppSelector as jest.Mock;
    mockUseAppSelector.mockReturnValue({ totalPages: 5, currentPage: 1 });

    const mockNavigate = jest.fn();
    jest
      .requireMock('react-router-dom')
      .useNavigate.mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <PaginationComponent />
      </BrowserRouter>
    );

    const nextPageButton = screen.getByRole('button', { name: 'Go to page 2' });
    await waitFor(() => {
      userEvent.click(nextPageButton);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/products?page=2', {
        replace: true
      });
    });
  });
});
