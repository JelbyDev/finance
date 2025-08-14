import type { App } from 'vue';
import pinia from './pinia';

export async function registerPlugins(app: App) {
  app.use(pinia);
}
