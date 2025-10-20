
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product, Category, Supplier } from '../types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_SUPPLIERS, STOCK_HISTORY } from '../utils/mockData';

interface InventoryContextType {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
  stockHistory: { name: string; stock: number }[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
}

export const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const usePersistentState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = usePersistentState<Product[]>('products', MOCK_PRODUCTS);
  const [categories, setCategories] = usePersistentState<Category[]>('categories', MOCK_CATEGORIES);
  const [suppliers, setSuppliers] = usePersistentState<Supplier[]>('suppliers', MOCK_SUPPLIERS);
  const [loading, setLoading] = useState(true);
  
  const stockHistory = STOCK_HISTORY;

  useEffect(() => {
    // Simulate initial data load
    setLoading(true);
    setTimeout(() => {
      // If localStorage is empty, populate with mock data
      if (localStorage.getItem('products') === null) setProducts(MOCK_PRODUCTS);
      if (localStorage.getItem('categories') === null) setCategories(MOCK_CATEGORIES);
      if (localStorage.getItem('suppliers') === null) setSuppliers(MOCK_SUPPLIERS);
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id' | 'lastUpdated'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setProducts(prev => [newProduct, ...prev]);
  }, [setProducts]);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? { ...updatedProduct, lastUpdated: new Date().toISOString().split('T')[0] } : p))
    );
  }, [setProducts]);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, [setProducts]);

  const getProductById = useCallback((productId: string) => {
    return products.find(p => p.id === productId);
  }, [products]);

  const value = useMemo(() => ({
    products,
    categories,
    suppliers,
    stockHistory,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  }), [products, categories, suppliers, stockHistory, loading, addProduct, updateProduct, deleteProduct, getProductById]);

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};
