import storage from '@/utils/storage';
import { AxiosResponse } from 'axios';
import { services } from './services';

const namespaced = true;

const state = {
  user: null,
  store: {},
};

const mutations = {
  // eslint-disable-next-line no-empty-pattern
  UPDATE_STORE_INFOR(state, payload: any) {
    state.store = payload;
  },
};

const actions = {
  getStoreInfor({ commit, dispatch }, payload: any) {
    console.log('call store ok');
    return services
      .getStoreInfor(payload)
      .then(async (res: AxiosResponse<any>) => {
        console.log('data', res);
        let { data } = res;
        if (data.store) {
          // Commit mutations
          await commit('home/UPDATE_STORE_INFOR', data.store, { root: true });
          dispatch('refreshToken');
        }
      })
      .catch((err: string[]) => console.log(err));
  },
  refreshToken({ commit }) {
    console.log('call refresh ok');
    return services
      .refreshToken()
      .then(async (res: AxiosResponse<any>) => {
        console.log('refresh token', commit, res);
        let { data } = res;
        if (data.status) {
          storage.set('user', { token: data.token });
        }
      })
      .catch((err: string[]) => console.log(err));
  },
  logout({ commit }) {
    console.log('call logout ok');
    return services
      .logout()
      .then(async (res: AxiosResponse<any>) => {
        console.log('commit', commit, res);
      })
      .catch((err: string[]) => console.log(err));
  },
};

const getters = {};

export default { namespaced, state, getters, mutations, actions };
