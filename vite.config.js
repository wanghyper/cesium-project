import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {viteStaticCopy} from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/cesium/Build/Cesium/Workers/*',
                    dest: 'public/Cesium/Workers',
                },
                {
                    src: 'node_modules/cesium/Build/Cesium/ThirdParty/*',
                    dest: 'public/Cesium/ThirdParty',
                },
                {
                    src: 'node_modules/cesium/Build/Cesium/Assets/*',
                    dest: 'public/Cesium/Assets',
                },
                {
                    src: 'node_modules/cesium/Build/Cesium/Widgets/*',
                    dest: 'public/Cesium/Widgets',
                },
            ],
        }),
    ],
    server: {
        proxy: {
            '/output': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
});
