import { createApp } from 'vue';
import { registerPlugins } from '@/plugins';
import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);
app.use(router);
registerPlugins(app);

app.mount('#app');
