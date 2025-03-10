import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientNavbar from '../common/ClientNavbar';
import Footer from '../common/Footer';

const DashboardLayout = () => {
  return (
    <div>
      <ClientNavbar />  {/* New Navbar for Dashboard */}
      <main>
        <Outlet />  {/* Renders ClientDashboard content */}
      </main>
      
    </div>
  );
};

export default DashboardLayout;
