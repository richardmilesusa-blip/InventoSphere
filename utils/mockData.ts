
import { Product, Category, Supplier } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Electronics', productCount: 3 },
  { id: 'cat-2', name: 'Office Supplies', productCount: 4 },
  { id: 'cat-3', name: 'Furniture', productCount: 2 },
  { id: 'cat-4', name: 'Peripherals', productCount: 2 },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 'sup-1', name: 'TechSupply Co.', contactPerson: 'John Doe', email: 'john@techsupply.com', phone: '123-456-7890' },
  { id: 'sup-2', name: 'OfficeMax Pro', contactPerson: 'Jane Smith', email: 'jane@officemax.com', phone: '098-765-4321' },
  { id: 'sup-3', name: 'FurniCraft', contactPerson: 'Sam Wilson', email: 'sam@furnicraft.com', phone: '555-555-5555' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod-1', name: 'Laptop Pro 15"', category: 'Electronics', quantity: 50, price: 1200.00, supplier: 'TechSupply Co.', lastUpdated: '2023-10-26' },
  { id: 'prod-2', name: 'Wireless Mouse', category: 'Peripherals', quantity: 200, price: 25.50, supplier: 'TechSupply Co.', lastUpdated: '2023-10-25' },
  { id: 'prod-3', name: 'Ergonomic Chair', category: 'Furniture', quantity: 20, price: 350.00, supplier: 'FurniCraft', lastUpdated: '2023-10-20' },
  { id: 'prod-4', name: 'A4 Paper Ream', category: 'Office Supplies', quantity: 15, price: 5.00, supplier: 'OfficeMax Pro', lastUpdated: '2023-10-27' },
  { id: 'prod-5', name: 'Mechanical Keyboard', category: 'Peripherals', quantity: 75, price: 150.00, supplier: 'TechSupply Co.', lastUpdated: '2023-10-24' },
  { id: 'prod-6', name: 'Standing Desk', category: 'Furniture', quantity: 30, price: 450.00, supplier: 'FurniCraft', lastUpdated: '2023-10-15' },
  { id: 'prod-7', name: 'Webcam HD 1080p', category: 'Electronics', quantity: 8, price: 70.00, supplier: 'TechSupply Co.', lastUpdated: '2023-10-28' },
  { id: 'prod-8', name: 'Stapler', category: 'Office Supplies', quantity: 300, price: 8.00, supplier: 'OfficeMax Pro', lastUpdated: '2023-09-30' },
  { id: 'prod-9', name: 'Pen Pack (Black)', category: 'Office Supplies', quantity: 500, price: 12.00, supplier: 'OfficeMax Pro', lastUpdated: '2023-10-05' },
  { id: 'prod-10', name: 'USB-C Hub', category: 'Electronics', quantity: 120, price: 45.00, supplier: 'TechSupply Co.', lastUpdated: '2023-10-22' },
  { id: 'prod-11', name: 'Notebooks (5-pack)', category: 'Office Supplies', quantity: 250, price: 15.00, supplier: 'OfficeMax Pro', lastUpdated: '2023-10-18' },
];

export const STOCK_HISTORY = [
    { name: 'Jan', stock: 4000 },
    { name: 'Feb', stock: 3000 },
    { name: 'Mar', stock: 2000 },
    { name: 'Apr', stock: 2780 },
    { name: 'May', stock: 1890 },
    { name: 'Jun', stock: 2390 },
    { name: 'Jul', stock: 3490 },
    { name: 'Aug', stock: 3560 },
    { name: 'Sep', stock: 3120 },
    { name: 'Oct', stock: 4100 },
];
