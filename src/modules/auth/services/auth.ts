import { axios } from '@/plugins/axios';
import { AxiosPromise } from 'axios';
export default {
  login(data: any): AxiosPromise<any> {
    return axios({
      url: `/api/login`,
      method: 'post',
      data,
    });
  },
};
