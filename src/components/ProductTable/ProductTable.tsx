import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { ProductDetailsModal } from '../Modal/ProductDetailsModal';
import { IProduct } from '../../types/productTypes';
import { fetchProducts } from '../../store/thunks/productsThunks';

export const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, loading, error, currentPage, currentId } = useAppSelector(
    state => state.products
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleRowClick = (product: IProduct) => {
    setSelectedProduct(product);
    setModalOpen(prevState => !prevState);
  };

  useEffect(() => {
    dispatch(
      fetchProducts({ page: currentPage, filterId: currentId?.toString() })
    );
    navigate(
      `/products?page=${currentPage}${currentId ? `&id=${currentId}` : ''}`,
      { replace: true }
    );
  }, [dispatch, currentPage, navigate, currentId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: IProduct) => (
              <TableRow
                key={product.id}
                onClick={() => handleRowClick(product)}
                sx={{ cursor: 'pointer', backgroundColor: product.color }}
              >
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProductDetailsModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};
