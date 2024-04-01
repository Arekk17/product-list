import React, { useState, useCallback } from 'react';
import { setCurrentId } from '../../store/slices/productsSlice';
import { useAppDispatch } from '../../store/store';
import { TextField, Box } from '@mui/material';

export const FilterInput = () => {
  const [filterId, setFilterId] = useState('');
  const dispatch = useAppDispatch();

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const newFilterId = value === '' ? null : Number(value);
      setFilterId(value);
      dispatch(setCurrentId(newFilterId));
    },
    [dispatch]
  );

  return (
    <Box sx={{ m: 1, width: '25ch' }}>
      <TextField
        label="Filter by Product ID"
        variant="outlined"
        value={filterId}
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
