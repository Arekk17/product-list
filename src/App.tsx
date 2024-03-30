import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { ProductsTable } from './components/ProductTable';
import PorductsList from './page/PorductsList';

function App() {
  return (
    <Routes>
      <Route path="/products" element={<PorductsList />} />
      <Route path="/" element={<Navigate to="/products?page=1" replace />} />
    </Routes>
  );
}

export default App;
