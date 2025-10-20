
import React from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { useInventory } from '../../hooks/useInventory';

const Categories: React.FC = () => {
  const { categories } = useInventory();

  return (
    <PageWrapper>
      <Card>
        <h2 className="text-2xl font-bold text-white mb-6">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-100">{category.name}</h3>
              <p className="text-gray-400 mt-1">{category.productCount} products</p>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  );
};

export default Categories;
