import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar remains fixed on the left */}
            <Sidebar />
            
            <div className="flex-1 flex flex-col min-w-0">
                {/* Navbar remains fixed at the top */}
                <Navbar />
                
                {/* Main Content Area - Scrollable */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;