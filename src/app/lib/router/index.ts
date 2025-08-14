import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { ROUTE_NAMES } from '@/shared/config/routeConfig';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'shares',
        name: ROUTE_NAMES.SHARES,
        component: () => import('@/pages/SharesPage/Index.vue'),
      },
      { 
        path: 'bonds',
        name: ROUTE_NAMES.SHARES,
        component: () => import('@/pages/BondsPage/Index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
