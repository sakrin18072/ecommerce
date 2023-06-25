import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../Contexts/AuthorizationContext';
import AdminPanel from './AdminPanel';

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4 px-4 py-6">
            <AdminPanel />
          </div>
          <div className="w-3/4 px-4 py-6">
            <h4 className="text-lg font-semibold">Admin Name: {auth?.user?.name}</h4>
            <p className="text-sm">Email: {auth?.user?.email}</p>
            <p className="text-sm">Phone: {auth?.user?.phone}</p>
            <p className="text-sm">Address: {auth?.user?.address}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
