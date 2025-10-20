import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useInventory } from '../../hooks/useInventory';
import PageWrapper from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icons';
import { Product } from '../../types';

const Dashboard: React.FC = () => {
  const { products, suppliers, stockHistory } = useInventory();

  const totalProducts = products.length;
  const totalSuppliers = suppliers.length;
  const lowStockProducts = products.filter(p => p.quantity < 20);

  const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="p-2 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg text-white">
            <p className="label">{`${label}`}</p>
            <p className="intro">{`Stock: ${payload[0].value}`}</p>
          </div>
        );
      }
      return null;
  };

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Products" value={totalProducts} icon="products" />
        <StatCard title="Low Stock" value={lowStockProducts.length} icon="alert" colorScheme="warning" />
        <StatCard title="Suppliers" value={totalSuppliers} icon="suppliers" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">Stock Trend</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stockHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" />
                        <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="stock" stroke="#3b82f6" fillOpacity={1} fill="url(#colorStock)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
        
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Low Stock Alerts</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {lowStockProducts.length > 0 ? (
                lowStockProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                        <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-400">{product.category}</p>
                        </div>
                        <span className={`font-bold ${product.quantity <= 10 ? 'text-red-400' : 'text-yellow-400'}`}>
                            {product.quantity}
                        </span>
                    </div>
                ))
            ) : (
                <p className="text-gray-400 text-center py-8">No products are low on stock.</p>
            )}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

const StatCard: React.FC<{ title: string; value: number | string; icon: string; colorScheme?: 'primary' | 'warning' }> = ({ title, value, icon, colorScheme = 'primary' }) => {
    const colorSchemes = {
        primary: {
            bg: 'bg-primary/20',
            text: 'text-primary'
        },
        warning: {
            bg: 'bg-yellow-400/20',
            text: 'text-yellow-400'
        },
    };
    
    const colors = colorSchemes[colorScheme];

    return (
      <Card className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 ${colors.bg} rounded-full`}>
          <Icon name={icon} className={`w-8 h-8 ${colors.text}`} />
        </div>
      </Card>
    );
};

export default Dashboard;
