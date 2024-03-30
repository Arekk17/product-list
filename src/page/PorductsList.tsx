import React from 'react';
import { ProductsTable } from '../components/ProductTable/ProductTable';
import { Box } from '@mui/material';
import { PaginationComponent } from '../components/Pagination/Pagination';
import ProductFilter from '../components/Input/FilterInput';

const PorductsList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <ProductFilter />
      <ProductsTable />
      <Box sx={{ margin: 2 }}>
        <PaginationComponent />
      </Box>
    </Box>
  );
};

export default PorductsList;
