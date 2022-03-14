export default [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'AppLayout' },
    component: () => import('@/modules/home/views/Home.vue'),
  },
];
