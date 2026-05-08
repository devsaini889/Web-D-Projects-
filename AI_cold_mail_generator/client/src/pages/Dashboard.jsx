import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { ClipboardDocumentIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            // Endoint matches: router.post('/generate', protect, generateEmail);
            const { data } = await api.post('/ai/generate', { prompt });
            setResult(data);
            toast.success('AI Content Generated!');
        } catch (error) {
            console.error("API Error:", error);
            const msg = error.response?.data?.message || 'Failed to generate content';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, type) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(type);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(''), 2000);
    };

    const ResultCard = ({ title, content, type }) => (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6 transition-all hover:border-blue-300">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest">{title}</h3>
                <button
                    onClick={() => copyToClipboard(content, type)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Copy to clipboard"
                >
                    {copied === type ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                        <ClipboardDocumentIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                {content ? (
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                        {content}
                    </p>
                ) : (
                    <p className="text-sm text-gray-400 italic">No content generated for this section.</p>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-10">
            {/* LEFT SIDE: Input Form */}
            <div className="w-full lg:w-2/5">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:sticky lg:top-6">
                    <div className="flex items-center gap-2 mb-6">
                        <SparklesIcon className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-800">Prompt AI</h2>
                    </div>
                    
                    <form onSubmit={handleGenerate} className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block tracking-wider">
                                Campaign Context
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all h-64 bg-gray-50 resize-none"
                                placeholder="Describe who you are emailing and what your goal is..."
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </span>
                            ) : "Generate Outreach"}
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT SIDE: Output Cards */}
            <div className="w-full lg:w-3/5">
                {result ? (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Generated Results</h2>
                        
                        {/* 1. Subject Line */}
                        <ResultCard 
                            title="Subject Line" 
                            content={result.subject} 
                            type="subject" 
                        />

                        {/* 2. Email Body - Matches backend 'emailbody' lowercase */}
                        <ResultCard 
                            title="Email Body" 
                            content={result.emailbody} 
                            type="email" 
                        />

                        {/* 3. LinkedIn DM */}
                        <ResultCard 
                            title="LinkedIn Message" 
                            content={result.linkedInDM} 
                            type="linkedin" 
                        />

                        {/* 4. Follow-up Email - The missing card from your screenshot */}
                        <ResultCard 
                            title="Follow-up Strategy" 
                            content={result.followUpEmail} 
                            type="followup" 
                        />
                    </div>
                ) : (
                    <div className="h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-white text-gray-400">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                            <SparklesIcon className="w-12 h-12 text-gray-200" />
                        </div>
                        <p className="font-medium text-gray-500 text-lg">Awaiting your campaign details</p>
                        <p className="text-sm text-gray-400">Fill out the prompt on the left to generate content.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;