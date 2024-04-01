import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { IProduct } from '../../types/productTypes';

interface IProductDetailsModalProps {
  product: IProduct | null;
  open: boolean;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<IProductDetailsModalProps> = ({
  product,
  open,
  onClose
}) => {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-details-modal-title"
      aria-describedby="product-details-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography variant="h2">Product Details</Typography>
        <Typography
          id="product-details-modal-title"
          variant="h6"
          component="h2"
        >
          {product.name}
        </Typography>
        <Typography id="product-details-modal-description" sx={{ mt: 2 }}>
          ID: {product.id}
        </Typography>
        <Typography sx={{ mt: 2 }}>Year: {product.year}</Typography>
        <Typography sx={{ mt: 2 }}>Color: {product.color}</Typography>
        <Typography sx={{ mt: 2 }}>
          Pantone Value: {product.pantone_value}
        </Typography>
      </Box>
    </Modal>
  );
};
