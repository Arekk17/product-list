import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { setCurrentPage } from '../../store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const PaginationComponent = () => {
  const dispatch = useAppDispatch();
  const { totalPages, currentPage } = useAppSelector(state => state.products);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) =>
    dispatch(setCurrentPage(value));

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
};
