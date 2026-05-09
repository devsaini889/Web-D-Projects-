import axios from 'axios';

const api = axios.create({
    // Prioritizes environment variable, defaults to localhost:3000
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
});

// Interceptor to attach JWT token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;