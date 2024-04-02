import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const { page: urlPage, id: urlId } = useParams();
  const location = useLocation();
  const { products, loading, error, currentPage, currentId } = useAppSelector(
    state => state.products
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleRowClick = (product: IProduct) => {
    setSelectedProduct(product);
    setModalOpen(prevState => !prevState);
  };

  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    let page: number = Number(urlPage) || currentPage;
    let id: number | null = Number(urlId) || currentId;

    if (location.search) {
      const urlParams = new URLSearchParams(location.search);
      page = urlParams.get('page') ? Number(urlParams.get('page')) : page;
      id = urlParams.get('id') ? Number(urlParams.get('id')) : id;
    }

    dispatch(fetchProducts({ page, filterId: id?.toString() }));
    navigate(`/products?page=${page}${id ? `&id=${id}` : ''}`, {
      replace: true
    });
  }, [
    dispatch,
    navigate,
    urlPage,
    urlId,
    location.search,
    currentPage,
    currentId
  ]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: '100%', overflowX: 'auto', mt: 4 }}>
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'primary.light',
                '& th': { fontWeight: 'bold', color: 'primary.contrastText' }
              }}
            >
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
                sx={{
                  cursor: 'pointer',
                  backgroundColor: product.color
                }}
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
        onClose={handleModalClose}
      />
    </Box>
  );
};
