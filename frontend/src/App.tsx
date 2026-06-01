import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// Lazy load components for Suspense
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const ProductList = React.lazy(() => import('./pages/ProductList/ProductList'));
const ProductForm = React.lazy(() => import('./pages/ProductForm/ProductForm'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <React.Suspense fallback={<div className="loading">Loading Dashboard...</div>}>
                <Dashboard />
              </React.Suspense>
            } />
            <Route path="products" element={
              <React.Suspense fallback={<div className="loading">Loading Products...</div>}>
                <ProductList />
              </React.Suspense>
            } />
            <Route path="products/new" element={
              <React.Suspense fallback={<div className="loading">Loading...</div>}>
                <ProductForm />
              </React.Suspense>
            } />
            <Route path="products/edit/:id" element={
              <React.Suspense fallback={<div className="loading">Loading...</div>}>
                <ProductForm />
              </React.Suspense>
            } />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
