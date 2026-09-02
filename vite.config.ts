import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
    base: './',
    server: {
        open: true,
        host: '127.0.0.1',
        port: 3000,
    },
    css: {
    preprocessorOptions: {
        scss: {
                silenceDeprecations: ['import', 'global-builtin', 'if-function', 'legacy-js-api'],
            },
        },
    },
    resolve: {
        alias: [
            {
                find: /^@\/(.*)/,
                replacement: `${resolve(__dirname, 'src')}/$1`,
            },
        ]
    },
}));