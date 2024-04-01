import React from 'react';
import { ProductsTable } from '../components/ProductTable/ProductTable';
import { Box, Typography } from '@mui/material';
import { PaginationComponent } from '../components/Pagination/Pagination';
import { FilterInput } from '../components/Input/FilterInput';

const ProductsList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 4
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 'bold',
          marginBottom: 3,
          color: 'primary.main',
          textTransform: 'uppercase',
          letterSpacing: 2
        }}
      >
        Product List
      </Typography>
      <FilterInput />
      <ProductsTable />
      <Box sx={{ margin: 2 }}>
        <PaginationComponent />
      </Box>
    </Box>
  );
};

export default ProductsList;
