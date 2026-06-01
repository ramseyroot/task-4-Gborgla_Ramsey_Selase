import React, { useMemo, useState } from 'react';
import { api, type Product } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import Skeleton from '../../components/Skeleton/Skeleton';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductList.css';

// Initial fetch resource
const initialResource = api.getProducts();

interface ProductListResource {
  read: () => Product[] | undefined;
}

const ProductListContent: React.FC<{ resource: ProductListResource; refresh: () => void }> = ({ resource, refresh }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const products = resource.read() || [];
    return products.filter((p: Product) => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [resource, searchTerm]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        refresh();
      } catch (err) {
        alert(`Failed to delete product. \n ${err} `);
      }
    }
  };

  return (
    <div className="product-list-content">
      <div className="list-controls">
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/products/new" className="add-btn">
          <Plus size={20} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product: Product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

const ProductListSkeleton: React.FC = () => (
  <div className="product-grid">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="skeleton-card">
        <div className="skeleton-header">
          <Skeleton width="80px" height="24px" borderRadius="100px" />
          <Skeleton width="60px" height="24px" />
        </div>
        <Skeleton width="100%" height="24px" className="mt-4" />
        <Skeleton width="100%" height="48px" className="mt-2" />
        <div className="skeleton-footer mt-4">
          <Skeleton width="60px" height="20px" />
          <Skeleton width="80px" height="20px" />
        </div>
      </div>
    ))}
  </div>
);

const ProductList: React.FC = () => {
  const [resource, setResource] = useState(initialResource);
  
  const refresh = () => setResource(api.getProducts());

  return (
    <div className="product-list-page">
      <header className="page-header">
        <h1>Inventory</h1>
        <p>Manage and track your products</p>
      </header>

      <React.Suspense fallback={<ProductListSkeleton />}>
        <ProductListContent resource={resource} refresh={refresh} />
      </React.Suspense>
    </div>
  );
};

export default ProductList;
