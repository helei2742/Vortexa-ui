import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import '@/styles/element-theme.scss'; // 引入自定义主题

import "echarts"

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(ElementPlus);
app.mount('#app');
