import type { App } from 'vue';
import pinia from './pinia';
import VueQuery from './vueQuery';

export async function registerPlugins(app: App) {
  app
    .use(pinia)
    .use(VueQuery.plugin, VueQuery.options);
}
