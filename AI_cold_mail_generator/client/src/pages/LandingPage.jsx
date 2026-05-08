import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRightIcon, BoltIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
    const { user } = useAuth();

    const features = [
        {
            name: 'Lightning Fast Generation',
            description: 'Generate highly custom cold emails in seconds using state-of-the-art AI.',
            icon: BoltIcon,
        },
        {
            name: 'Omnichannel Outreach',
            description: 'Get an email, a follow-up, and a LinkedIn DM perfectly synced for your prospect.',
            icon: DocumentTextIcon,
        },
        {
            name: ' Higher Conversion Rates',
            description: 'Personalized copy ensures higher open rates and better reply outcomes.',
            icon: ChartBarIcon,
        },
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary-100 selection:text-primary-900">
            {/* Navigation */}
            <nav className="border-b border-gray-200 bg-white fixed w-full z-50 transition-all shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 min-h-16">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-blue-600">
                                MailGen AI
                            </span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            {user ? (
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 shadow-sm whitespace-nowrap"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 text-sm transition-colors duration-150 whitespace-nowrap"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 shadow-md whitespace-nowrap"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-24 sm:pt-48 sm:pb-32 overflow-visible">
                <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40 pointer-events-none" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#dbeafe] to-[#dbeafe] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                        Write Cold Emails That <br className="hidden sm:block" />
                        <span className="text-blue-600">Actually Get Replies</span>
                    </h1>
                    <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Stop wasting hours drafting outreach. Enter your prospect's context, and let our AI generate the perfect structured sequence. Email, Follow-up, and LinkedIn DM all at once.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <Link
                            to={user ? "/dashboard" : "/signup"}
                            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-full text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-950 transition-colors duration-150 shadow-lg whitespace-nowrap group"
                        >
                            Start Generating for Free
                            <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-24 bg-gray-50/50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to close more deals</h2>
                        <p className="mt-4 text-lg text-gray-600 border-b-2 border-transparent inline-block pb-1">Built for sales teams who demand performance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mb-6">
                                    <feature.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Look CTA */}
            <div className="relative isolate overflow-hidden bg-gray-900">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to scale your outreach?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Join hundreds of sales professionals using MailGen to accelerate their pipeline today.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 whitespace-nowrap"
                            >
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </div>
                <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="gradient">
                            <stop stopColor="#2563eb" />
                            <stop offset="1" stopColor="#1e40af" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    <span className="text-xl font-bold text-blue-600 mb-4">
                        MailGen AI
                    </span>
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} MailGen AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;