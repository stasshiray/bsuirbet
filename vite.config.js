export default {
    server: {
        proxy: {
            '/api': {
                target: process.env.VITE_BACKEND_URL || 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
};