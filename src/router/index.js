import { createRouter, createWebHashHistory } from 'vue-router';
import SeznamKontejneru from '@/views/SeznamKontejneru.vue';

const routes = [
  {
    path: '/seznam',
    name: 'seznam',
    component: SeznamKontejneru,
  },
  {
    path: '/addContainer',
    name: 'addContainer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/MainField.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
