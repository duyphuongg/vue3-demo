import { services } from './services';

const namespaced = true;

const state = {
  listReviews: null,
  isLoadingListReviews: true,
  listProductsData: null,
  arrProducts: [],
  isLoadingListProductsData: true,
};

const getters = {};

const mutations = {
  updateListReviews: (state, data) => {
    state.listReviews = data;
  },
  updateIsLoadingListReviews: (state, data) => {
    state.isLoadingListReviews = data;
  },
  updateListProductsData: (state, data) => {
    state.listProductsData = data;
  },
  updateArrProducts: (state, data) => {
    state.arrProducts = data;
  },
  loadMoreArrProducts: (state, data) => {
    state.arrProducts.push(...data);
  },
  updateIsLoadingListProductsData: (state, data) => {
    state.isLoadingListProductsData = data;
  },
};

const actions = {
  async getReviews({ commit }: { commit: any }, payload: any) {
    let res = await services.getReviews(payload);
    if (res.status === 200 && res.data.status) {
      commit('updateListReviews', res.data.data);
      commit('updateIsLoadingListReviews', false);
    }
  },

  async getListProducts({ commit }: { commit: any }, payload: any) {
    let res = await services.getListProducts(payload);
    if (res.status === 200 && res.data.status) {
      commit('updateListProductsData', res.data.allProducts);
      commit('updateArrProducts', res.data.allProducts.data);
      commit('updateIsLoadingListProductsData', false);
    }
  },
};

export default { namespaced, state, getters, mutations, actions };
