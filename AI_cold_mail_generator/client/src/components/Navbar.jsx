import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logout } = useAuth();

    // DEBUG: Check the console to see what the 'user' object actually looks like
    useEffect(() => {
        console.log("Navbar Auth User State:", user);
    }, [user]);

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
            {/* Desktop Welcome Message */}
            <div className="hidden md:flex items-center gap-3">
                <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-lg font-medium text-gray-800">
                    Welcome back, <span className="font-bold text-blue-600">
                        {/* Try user.name first, then fallback to user.username, then 'User' */}
                        {user?.name || user?.username || 'User'}
                    </span>
                </div>
            </div>

            {/* Mobile Brand Title */}
            <div className="text-lg font-bold text-blue-600 md:hidden">
                MailGen AI
            </div>

            {/* Right Side: User Email & Logout */}
            <div className="flex items-center space-x-6">
                {/* Show email on desktop for better context */}
                <div className="hidden lg:block text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Logged in as</p>
                    <p className="text-sm text-gray-600">{user?.email || 'Guest'}</p>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-100"
                >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;