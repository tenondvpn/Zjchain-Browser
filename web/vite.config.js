import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve as resolves} from "path"
import {fileURLToPath, URL} from 'node:url'
import inject from "@rollup/plugin-inject";
import alias from "@rollup/plugin-alias";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        alias(),
        inject({
            $: "jquery",  // 这里会自动载入 node_modules 中的 jquery   jquery全局变量
            jQuery: "jquery",
            "windows.jQuery": "jquery"
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // root:"..",
    base: '/static/',
    server: {
        host: 'localhost',
        port: 3000,
        open: false,
        watch: {
            usePolling: true,
            disableGlobbing: false,
        },
    },
    build: {
        outDir: resolves('../static/dist'),
        // 指定生成静态资源的存放路径(相对于 build.outDir), 默认assets。
        assetsDir: '',
        manifest: true,
        emptyOutDir: true,
        // 设置最终构建的浏览器兼容目标。
        target: 'es2015',
        rollupOptions: {
            input: {
                main: resolves('./src/main.js'),
            },
            output: {
                chunkFileNames: undefined,
            },
              external: ['*.png'],

        },
    }
})