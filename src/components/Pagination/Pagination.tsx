import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

export const PaginationComponent = () => {
  const navigate = useNavigate();
  const { totalPages, currentPage } = useAppSelector(state => state.products);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) =>
    navigate(`/products?page=${value}`, { replace: true });

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
