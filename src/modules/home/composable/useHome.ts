import store from '@/store';
import helper from '@/utils/helper';
import storage from '@/utils/storage';
// import { ref } from 'vue';
// import { services } from '../services';

export const useHome = () => {
  const validateInitPage = () => {
    let user = storage.get('user');
    if (!user) {
      let urlPage = window.location.href;
      let objParam = helper.getQueryStringParams(urlPage);
      // eslint-disable-next-line no-prototype-builtins
      if (objParam.hasOwnProperty('api_token')) {
        storage.set('user', { token: objParam.api_token });
        let path = window.location.href.split('?')[0];
        console.log('path', path);
        window.location.replace(path);
        getStoreInfor();
      }
    }
  };
  const getStoreInfor = async () => {
    console.log('getStoreInfor');
    try {
      await store.dispatch('home/getStoreInfor');
    } catch (e) {
      console.log('error', e);
    }
  };
  const refreshToken = async () => {
    try {
      await store.dispatch('home/refreshToken');
    } catch (e) {
      console.log('error', e);
    }
  };

  const logout = async () => {
    try {
      await store.dispatch('home/logout');
    } catch (e) {
      console.log('error', e);
    }
  };

  return {
    getStoreInfor,
    refreshToken,
    logout,
    validateInitPage,
  };
};
