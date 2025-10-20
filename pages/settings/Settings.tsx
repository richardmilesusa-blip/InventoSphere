import React from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageWrapper>
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
      <div className="grid grid-cols-1 md:max-w-md gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Profile</h3>
          {user && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.name}</p>
                  <p className="text-gray-400">{user.role}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p>{user.email}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageWrapper>
  );
};

export default Settings;
