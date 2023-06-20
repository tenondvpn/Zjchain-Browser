import './assets/main.css'
// 引入插件
import $ from 'jquery';   // 此处引用非全局变量  需vite.config.ts中配置全局引用
// import go from 'gojs';  // 按需引用 simulation.js
import 'bootstrap' // vite.config.ts中设置引用路径
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery-ui-dist/jquery-ui';
import 'jquery-ui-dist/jquery-ui.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
