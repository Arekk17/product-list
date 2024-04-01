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
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #f3f3f3, #ededed)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
          }
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Product Details
        </Typography>
        <Typography
          id="product-details-modal-title"
          variant="subtitle1"
          component="h2"
        >
          {product.name}
        </Typography>
        <Typography id="product-details-modal-description" sx={{ mt: 2 }}>
          ID: {product.id}
        </Typography>
        <Typography sx={{ mt: 2 }}>Year: {product.year}</Typography>
        <Typography sx={{ mt: 2 }}>
          Color:
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              backgroundColor: product.color,
              width: '16px',
              height: '16px',
              borderRadius: '50%'
            }}
          />{' '}
          {product.color}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Pantone Value: {product.pantone_value}
        </Typography>
      </Box>
    </Modal>
  );
};
