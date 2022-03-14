import { axios } from '@/plugins/axios';
import { AxiosPromise } from 'axios';

export default {
  getReviews(data: any): AxiosPromise<any> {
    return axios({
      url: `api/reviews/get-list`,
      method: 'get',
      params: data,
    });
  },

  handleStatusPerReview(productId: any, data: any): AxiosPromise<any> {
    return axios({
      url: `api/reviews/${productId}`,
      method: 'put',
      data: data,
    });
  },

  handleBulkStatusReview(data: any): AxiosPromise<any> {
    return axios({
      url: `api/reviews/update/bulk`,
      method: 'put',
      data: data,
    });
  },

  handleDeletePerReview(productId: any): AxiosPromise<any> {
    return axios({
      url: `api/reviews/${productId}`,
      method: 'delete',
    });
  },

  handleBulkDeleteReview(data: any): AxiosPromise<any> {
    return axios({
      url: `api/reviews/delete/bulk`,
      method: 'delete',
      data: data,
    });
  },

  getListProducts(data: any): AxiosPromise<any> {
    return axios({
      url: `api/manage-review/products`,
      method: 'get',
      params: data,
    });
  },
};
