import store from '@/store';
// import { ref } from 'vue';
// import { services } from '../services';

export const useAuth = () => {
  const login = async (data: any) => {
    try {
      await store.dispatch('auth/login', data);
    } catch (e) {
      console.log('error', e);
    }
  };
  return {
    login,
  };
};
