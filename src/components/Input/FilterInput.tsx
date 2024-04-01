import React, { useState } from 'react';
import { setCurrentId } from '../../store/slices/productsSlice';
import { useAppDispatch } from '../../store/store';
import { TextField, Box } from '@mui/material';

const ProductFilter = () => {
  const [filterId, setFilterId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === '') {
      const newFilterId = value === '' ? null : Number(value);
      setFilterId(newFilterId);
      dispatch(setCurrentId(newFilterId));
    }
  };

  return (
    <Box sx={{ m: 1, width: '25ch' }}>
      <TextField
        label="Filter by Product ID"
        variant="outlined"
        value={filterId === null ? '' : filterId}
        onChange={handleFilterChange}
        size="small"
        fullWidth
        type="number"
        InputProps={{
          inputProps: { min: 0 }
        }}
      />
    </Box>
  );
};

export default ProductFilter;
