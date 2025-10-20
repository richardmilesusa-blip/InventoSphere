
import React from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { useInventory } from '../../hooks/useInventory';

const Suppliers: React.FC = () => {
  const { suppliers } = useInventory();

  return (
    <PageWrapper>
      <Card>
        <h2 className="text-2xl font-bold text-white mb-6">Suppliers Directory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4">Company Name</th>
                <th className="p-4">Contact Person</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{supplier.name}</td>
                  <td className="p-4">{supplier.contactPerson}</td>
                  <td className="p-4">{supplier.email}</td>
                  <td className="p-4">{supplier.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
};

export default Suppliers;
