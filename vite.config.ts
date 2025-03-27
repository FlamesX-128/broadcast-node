import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';

import mkcert from 'vite-plugin-mkcert';

import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        mkcert(),
        tailwindcss() as PluginOption,
        svelte(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
    server: {
        allowedHosts: [
            '6c00-2806-2f0-9a01-f4a3-4c9a-8d05-9285-a6b1.ngrok-free.app'
        ], // @ts-ignore
        https: false
    }
});
