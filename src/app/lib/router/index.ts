import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { ROUTE_NAMES } from '@/shared/config/routeConfig';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.HOME,
        component: () => import('@/pages/HomePage'),
      },
      { 
        path: 'bonds',
        name: ROUTE_NAMES.BONDS,
        component: () => import('@/pages/BondsPage'),
      },
      { 
        path: 'shares',
        name: ROUTE_NAMES.SHARES,
        component: () => import('@/pages/SharesPage'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
