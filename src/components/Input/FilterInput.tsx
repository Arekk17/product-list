import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export const FilterInput = () => {
  const [filterId, setFilterId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryId = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('id') || '';
  }, [location.search]);

  useEffect(() => {
    setFilterId(getQueryId());
  }, [getQueryId]);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFilterId(value);
      const queryParams = new URLSearchParams(location.search);
      if (value) {
        queryParams.set('id', value);
      } else {
        queryParams.delete('id');
      }
      navigate(`?${queryParams.toString()}`);
    },
    [navigate, location.search]
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
