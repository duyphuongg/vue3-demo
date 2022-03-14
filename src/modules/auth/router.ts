export default [
  {
    path: '/install',
    name: 'Install',
    meta: { layout: 'AuthLayout' },
    component: () => import('@/modules/auth/views/AuthInstall.vue'),
  },
];
