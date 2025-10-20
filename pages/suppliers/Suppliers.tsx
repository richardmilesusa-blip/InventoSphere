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
        
        {/* Desktop Table View */}
        <div className="overflow-x-auto hidden md:block">
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

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {suppliers.map((supplier) => (
                <div key={supplier.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h3 className="font-bold text-lg text-white">{supplier.name}</h3>
                    <p className="text-sm text-gray-300">{supplier.contactPerson}</p>
                    <div className="mt-4 space-y-2 text-sm border-t border-white/10 pt-3">
                        <p className="text-gray-400">
                            <a href={`mailto:${supplier.email}`} className="hover:text-primary">{supplier.email}</a>
                        </p>
                        <p className="text-gray-400">
                            <a href={`tel:${supplier.phone}`} className="hover:text-primary">{supplier.phone}</a>
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </Card>
    </PageWrapper>
  );
};

export default Suppliers;
