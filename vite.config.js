import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        glsl(),
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
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 8080,
        proxy: {
            '/server': {
                target: 'http://172.25.96.193:8080',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/server/, ''),
            },
        },
    },
});
