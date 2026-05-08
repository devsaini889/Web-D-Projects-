import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    // 1. Get data from State OR LocalStorage (Fixes the blank page refresh issue)
    const userId = location.state?.userId || localStorage.getItem('pendingUserId');
    const email = location.state?.email || localStorage.getItem('pendingEmail');

    useEffect(() => {
        // 2. Only redirect if we truly have no idea who the user is
        if (!userId) {
            console.warn("No UserID found, redirecting to signup.");
            toast.error("Please sign up to continue.");
            navigate('/signup');
        }
    }, [userId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) return toast.error("Enter 6-digit code");

        setLoading(true);
        try {
            const { data } = await api.post('/auth/verify-otp', { userId, otp });
            
            // 3. Success: Clean up temporary storage
            localStorage.removeItem('pendingUserId');
            localStorage.removeItem('pendingEmail');
            
            login(data);
            toast.success('Verified successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    // 4. Safety Render: Show a message instead of a white screen if data is missing
    if (!userId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading verification session...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Verify Email</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter the code sent to <span className="font-bold text-blue-600">{email}</span>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow border border-gray-100 rounded-xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            required
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            className="block w-full text-center text-3xl font-bold tracking-[0.5em] border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="000000"
                        />
                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;