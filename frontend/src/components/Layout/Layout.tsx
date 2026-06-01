import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Package, PlusCircle, LayoutDashboard, Menu, X } from 'lucide-react';
import './Layout.css';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button onClick={toggleSidebar} className="menu-btn" aria-label="Toggle menu">
          <Menu size={24} />
        </button>
        <h1 className="logo">Inventory</h1>
        <div style={{ width: 24 }}></div> {/* Spacer */}
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="logo">Product Manager</h2>
          <button onClick={toggleSidebar} className="close-btn mobile-only">
            <X size={24} />
          </button>
        </div>
        
        <nav className="nav">
          <NavLink to="/" onClick={closeSidebar} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/products" onClick={closeSidebar} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Package size={20} />
            <span>Products</span>
          </NavLink>
          <NavLink to="/products/new" onClick={closeSidebar} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <PlusCircle size={20} />
            <span>Add Product</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
