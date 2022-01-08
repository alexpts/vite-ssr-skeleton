import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import projectCjs from './src/vite/plugin/cjsPlugin.js'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const baseUrl = process.env.BASE_URL

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        projectCjs()
    ],
    base: baseUrl,
    server: {
        proxy: {
            '/api': 'http://127.0.0.1:4000',
        }
    },
    build: {
        //assetsDir: baseUrl ? 'app/assets' : 'assets',
        emptyOutDir: true,
        manifest: true,
        ssrManifest: true
    }
})
