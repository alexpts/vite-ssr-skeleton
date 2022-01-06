import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: '/app/',
    server: {
        proxy: {
            '/api': 'http://127.0.0.1:4000',
        }
    },
    build: {
        emptyOutDir: true,
        manifest: true,
        ssrManifest: true
    }

})
