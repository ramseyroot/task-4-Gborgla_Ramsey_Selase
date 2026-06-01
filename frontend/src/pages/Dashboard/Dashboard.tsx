import React, { useMemo } from 'react';
import { api, type Product } from '../../services/api';
import './Dashboard.css';

const initialResource = api.getProducts();

const DashboardContent: React.FC<{ resource: { read: () => Product[] | undefined } }> = ({ resource }) => {
  const stats = useMemo(() => {
    const products = resource.read() || [];
    const total = products.length;
    const lowStock = products.filter((p: Product) => p.quantity < 5).length;
    const totalValue = products.reduce((sum: number, p: Product) => sum + (p.price * p.quantity), 0);
    
    return { total, lowStock, totalValue };
  }, [resource]);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Products</h3>
        <p className="stat-value">{stats.total}</p>
      </div>
      <div className="stat-card">
        <h3>Low Stock Items</h3>
        <p className="stat-value" style={{ color: stats.lowStock > 0 ? '#ef4444' : 'var(--primary)' }}>
          {stats.lowStock}
        </p>
      </div>
      <div className="stat-card">
        <h3>Total Inventory Value</h3>
        <p className="stat-value">${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
};

const DashboardSkeleton: React.FC = () => (
  <div className="stats-grid">
    {[1, 2, 3].map(i => (
      <div key={i} className="stat-card">
        <div style={{ height: '14px', width: '80px', background: '#eee', marginBottom: '8px' }}></div>
        <div style={{ height: '24px', width: '40px', background: '#eee' }}></div>
      </div>
    ))}
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your product inventory</p>
      </header>

      <React.Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent resource={initialResource} />
      </React.Suspense>

      <section className="welcome-section">
        <h2>Welcome to Product Manager</h2>
        <p>This application helps you stay on top of your stock levels. Use the sidebar to browse products, add new inventory items, or update existing ones.</p>
        <div className="features-list">
          <div className="feature-item">
            <strong>Mobile-First:</strong> Designed for management on the go.
          </div>
          <div className="feature-item">
            <strong>Suspense-Powered:</strong> Smooth transitions and skeleton loading.
          </div>
          <div className="feature-item">
            <strong>Full CRUD:</strong> Complete control over your product data.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
