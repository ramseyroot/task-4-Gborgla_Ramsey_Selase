import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, type Product } from '../../services/api';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import './ProductForm.css';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadProduct = async (productId: string) => {
    setError(null);
    try {
      // Use api.getProduct instead of manual fetch
      const resource = api.getProduct(productId);
      const product = await resource.read();
      
      if (product) {
        setFormData(product);
      } else {
        setError('Product not found or backend unreachable.');
      }
    } catch (err) {
      setError(`Failed to load product details.\n ${err} `);
    } finally {
      setFetching(false);
    }
  };
  
useEffect(() => {
  const fetchProduct = async () => {
    if (isEdit && id) {
      await loadProduct(id);
    }
  };

  fetchProduct();
}, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
    // Clear field error when field changes
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.quantity < 0) newErrors.quantity = 'Quantity cannot be negative';
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);
    try {
      if (isEdit && id) {
        await api.updateProduct(Number(id), formData);
      } else {
        await api.createProduct(formData);
      }
      navigate('/products');
    } catch (err) {
      setError(`Failed to save product. Please check if the backend is running. \n ${err} `);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="loading-state"><Loader2 className="animate-spin" /> Loading product...</div>;
  }

  if (error && isEdit && !formData.name) {
    return (
      <div className="product-form-page">
        <header className="page-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1>Error</h1>
        </header>
        <div className="no-results" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <AlertCircle size={48} color="#ef4444" />
          <p>{error}</p>
          <button onClick={() => id && loadProduct(id)} className="save-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-form-page">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      </header>

      {error && (
        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name*</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className={fieldErrors.name ? 'error' : ''}
            placeholder="e.g. Wireless Mouse"
          />
          {fieldErrors.name && <span className="error-msg">{fieldErrors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category*</label>
          <input 
            type="text" 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className={fieldErrors.category ? 'error' : ''}
            placeholder="e.g. Electronics"
          />
          {fieldErrors.category && <span className="error-msg">{fieldErrors.category}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($)*</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              step="0.01"
              value={formData.price} 
              onChange={handleChange}
              className={fieldErrors.price ? 'error' : ''}
            />
            {fieldErrors.price && <span className="error-msg">{fieldErrors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity*</label>
            <input 
              type="number" 
              id="quantity" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange}
              className={fieldErrors.quantity ? 'error' : ''}
            />
            {fieldErrors.quantity && <span className="error-msg">{fieldErrors.quantity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            rows={4}
            value={formData.description} 
            onChange={handleChange}
            placeholder="Describe the product..."
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/products')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            <span>{isEdit ? 'Update Product' : 'Save Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
