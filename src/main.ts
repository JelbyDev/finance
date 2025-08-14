import { createApp } from 'vue';
import { registerPlugins } from '@/app/plugins';
import App from '@/app/App.vue';
import router from '@/app/lib/router';

import '@/app/styles/index.scss';

const app = createApp(App);
app.use(router);
registerPlugins(app);

app.mount('#app');
