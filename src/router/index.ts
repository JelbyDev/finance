import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'shares',
        name: 'shares',
        component: () => import('@/pages/SharesPage.vue'),
      },
      {
        path: 'bonds',
        name: 'bonds',
        component: () => import('@/pages/BondsPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
