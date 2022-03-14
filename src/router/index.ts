import { createRouter, createWebHistory } from 'vue-router';
import { useRoute } from '@/composables/useRoute';
import store from '@/store';
import { services } from '@/modules/manage_review/services';
// import storage from '@/utils/storage';

const { routes } = useRoute();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // const user = storage.get('user');
  // const publicPages = ['/install'];
  // const authRequired = !publicPages.includes(to.path);
  // if (authRequired && !user) {
  //   return next('/install');
  // }
  if (to.name === 'ManageReviews') {
    (async () => {
      let res = await services.getListProducts({ store_id: 1, page: 1 });
      if (res.status === 200 && res.data.status) {
        store.commit('manageReviews/updateListProductsData', res.data.allProducts);
        store.commit('manageReviews/updateArrProducts', res.data.allProducts.data);
        store.commit('manageReviews/updateIsLoadingListProductsData', false);
        let firstProduct = res?.data?.allProducts?.data[0]?.id ?? 0;
        if (firstProduct) {
          next({ name: 'ProductDetail', params: { productId: firstProduct } });
        } else {
          next();
        }
      }
    })();
  } else {
    next();
  }
});

export default router;
