/**
 * Method: POST, PUT, DELETE => payload: data
 * Method: GET => payload => params:{data}
 */
import { default as instance } from 'axios';
import storage from '@/utils/storage';
import router from '@/router';
import { ref } from 'vue';

const AxiosConfig = {
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 60 * 1000,
  validateStatus: function (status: number) {
    return status >= 200 && status <= 500;
  },
};

const showPopupOutSession = ref(false);

//Create Instance
const axios = instance.create(AxiosConfig);

// Interceptor request
axios.interceptors.request.use(function (config: any) {
  const user: { token: string } | null = storage.get('user');
  if (user) {
    // const decode: any = jwt.decode(user.token);
    // const id_token = decode ? decode.data._id : '';
    if (user.token) {
      showPopupOutSession.value = false;
      config.headers['Authorization'] = `Bearer ${user.token}`;
      return config;
    }
  }
  // config.headers['Authorization'] = `Bearer 13|9626HWVyLSJ4mzfcbpaK0EUIc7jNx6SlfHOMWVDc`;
  return config;
});

//Comment code axios refresh token

function handleHttpError(status: number): void {
  // function handleHttpError(status, data) {
  if (status) {
    switch (status) {
      case 401:
        router.push({ name: 'Install' });
        console.log('error Unauthorized 401');
        break;
    }
  }
}

axios.interceptors.response.use(
  async function (res: any) {
    const { status } = res;
    handleHttpError(status);
    return res;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { axios, showPopupOutSession };
