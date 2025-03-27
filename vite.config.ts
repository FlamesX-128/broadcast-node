import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';

import mkcert from 'vite-plugin-mkcert';
import { viteSingleFile } from "vite-plugin-singlefile"

import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        mkcert(),
        tailwindcss() as PluginOption,
        svelte(),
        viteSingleFile(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
    server: {
        allowedHosts: [],
        https: {}
    }
});
