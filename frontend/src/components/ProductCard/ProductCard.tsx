import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Tag, Box } from 'lucide-react';
import { type Product } from '../../services/api';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="card-header">
        <span className="category-badge">{product.category}</span>
        <div className="card-actions">
          <button 
            onClick={() => navigate(`/products/edit/${product.id}`)} 
            className="action-btn edit"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => product.id && onDelete(product.id)} 
            className="action-btn delete"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description || 'No description available.'}</p>
        
        <div className="product-meta">
          <div className="meta-item">
            <Tag size={16} />
            <span>${product.price.toFixed(2)}</span>
          </div>
          <div className="meta-item">
            <Box size={16} />
            <span className={product.quantity < 5 ? 'low-stock' : ''}>
              {product.quantity} in stock
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
