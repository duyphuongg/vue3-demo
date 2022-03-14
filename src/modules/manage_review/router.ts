export default [
  {
    path: '/manage-reviews',
    name: 'ManageReviews',
    component: () => import(/* webpackChunkName: "ManageReviews" */ './views/ManageReviews.vue'),
    children: [
      {
        path: ':productId',
        name: 'ProductDetail',
        component: () => import(/* webpackChunkName: "ProductDetail" */ './views/ProductDetail.vue'),
      },
    ],
  },
];
