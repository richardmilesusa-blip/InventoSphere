import React, { useState, useMemo, useCallback } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icons';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useInventory } from '../../hooks/useInventory';
import { Product } from '../../types';

type SortConfig = {
    key: keyof Product;
    direction: 'ascending' | 'descending';
} | null;


const ProductForm: React.FC<{ product?: Product | null; onSave: (product: any) => void; onCancel: () => void; }> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        category: product?.category || '',
        quantity: product?.quantity || 0,
        price: product?.price || 0,
        supplier: product?.supplier || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'quantity' || name === 'price' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(product ? { ...product, ...formData } : formData);
    };

    const { categories, suppliers } = useInventory();

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
            <div className="grid grid-cols-2 gap-4">
                <Input label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
                <Input label="Price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-100">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Supplier</label>
                <select name="supplier" value={formData.supplier} onChange={handleChange} required className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-100">
                    <option value="">Select Supplier</option>
                    {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Product</Button>
            </div>
        </form>
    );
};


const Products: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useInventory();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const sortedProducts = useMemo(() => {
        let sortableItems = [...filteredProducts];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredProducts, sortConfig]);
    
    const requestSort = (key: keyof Product) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof Product) => {
        if (!sortConfig || sortConfig.key !== key) {
            return null;
        }
        return sortConfig.direction === 'ascending' ? <Icon name="arrowUp" className="w-4 h-4 ml-2" /> : <Icon name="arrowDown" className="w-4 h-4 ml-2" />;
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };
    
    const handleSaveProduct = (productData: any) => {
        if(editingProduct) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    
    const tableHeaders: { key: keyof Product; label: string }[] = [
        { key: 'name', label: 'Product Name' },
        { key: 'category', label: 'Category' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'price', label: 'Price' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'lastUpdated', label: 'Last Updated' },
    ];


    return (
        <PageWrapper>
            <Card>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-white">Products</h2>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Input 
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64"
                        />
                        <Button onClick={handleAddProduct} leftIcon={<Icon name="plus" className="w-5 h-5"/>}>Add Product</Button>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/20">
                                {tableHeaders.map(({ key, label }) => (
                                    <th key={key} className="p-4 cursor-pointer" onClick={() => requestSort(key)}>
                                        <div className="flex items-center">
                                            {label}
                                            {getSortIcon(key)}
                                        </div>
                                    </th>
                                ))}
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts.map((product) => (
                                <tr key={product.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4">{product.category}</td>
                                    <td className="p-4">{product.quantity}</td>
                                    <td className="p-4">${product.price.toFixed(2)}</td>
                                    <td className="p-4">{product.supplier}</td>
                                    <td className="p-4">{product.lastUpdated}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" className="p-2" onClick={() => handleEditProduct(product)}><Icon name="edit" className="w-4 h-4"/></Button>
                                            <Button variant="ghost" className="p-2 text-red-400 hover:text-red-400" onClick={() => deleteProduct(product.id)}><Icon name="delete" className="w-4 h-4"/></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Mobile Card View */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg text-white">{product.name}</h3>
                                    <div className="flex gap-1 -mr-2">
                                        <Button variant="ghost" className="p-2" onClick={() => handleEditProduct(product)}><Icon name="edit" className="w-4 h-4"/></Button>
                                        <Button variant="ghost" className="p-2 text-red-400 hover:text-red-400" onClick={() => deleteProduct(product.id)}><Icon name="delete" className="w-4 h-4"/></Button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">{product.category}</p>
                                <div className="mt-4 space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-400">Quantity:</span> <span className="font-medium">{product.quantity}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">Price:</span> <span className="font-medium">${product.price.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">Supplier:</span> <span className="font-medium">{product.supplier}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">Updated:</span> <span className="font-medium">{product.lastUpdated}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
            >
                <ProductForm 
                    product={editingProduct} 
                    onSave={handleSaveProduct} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            </Modal>
        </PageWrapper>
    );
};

export default Products;