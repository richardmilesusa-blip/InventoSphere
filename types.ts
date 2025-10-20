
export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Staff';
}
