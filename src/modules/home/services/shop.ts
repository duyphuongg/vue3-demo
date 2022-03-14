import { axios } from '@/plugins/axios';
import { AxiosPromise } from 'axios';
export default {
  getStoreInfor(data: any): AxiosPromise<any> {
    return axios({
      url: `/api/store`,
      method: 'get',
      data,
    });
  },
  refreshToken(data: any): AxiosPromise<any> {
    return axios({
      url: `/api/refresh`,
      method: 'post',
      data,
    });
  },
  logout(data: any): AxiosPromise<any> {
    return axios({
      url: `/api/logout`,
      method: 'post',
      data,
    });
  },
};
