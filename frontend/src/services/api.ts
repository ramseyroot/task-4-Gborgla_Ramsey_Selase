/**
 * A simple wrapper for Suspense-compatible data fetching.
 * In a production app, you'd likely use TanStack Query or similar.
 */
export function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;
  let error: any;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw error;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

const API_BASE = 'http://localhost:3000/api';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
}

export const api = {
  getProducts: () => {
    const promise = fetch(`${API_BASE}/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .catch((err) => {
        console.error('API Error (getProducts):', err);
        return []; // Fallback to empty list
      });
    return wrapPromise<Product[]>(promise);
  },

  getProduct: (id: string) => {
    const promise = fetch(`${API_BASE}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
        return res.json();
      })
      .catch((err) => {
        console.error(`API Error (getProduct ${id}):`, err);
        return null; // Fallback to null
      });
    return wrapPromise<Product | null>(promise);
  },

  createProduct: async (product: Product) => {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error('Failed to create product');
      return await res.json();
    } catch (err) {
      console.error('API Error (createProduct):', err);
      throw err; // Components should handle this for form submission
    }
  },

  updateProduct: async (id: number, product: Product) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error('Failed to update product');
      return await res.json();
    } catch (err) {
      console.error(`API Error (updateProduct ${id}):`, err);
      throw err;
    }
  },

  deleteProduct: async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete product');
      return await res.json();
    } catch (err) {
      console.error(`API Error (deleteProduct ${id}):`, err);
      throw err;
    }
  },
};
