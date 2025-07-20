import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  // import.meta.env.BASE_URL прокидывается в случаях, когда приложение может быть развернуто не от корня домена
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
});

export default router;
