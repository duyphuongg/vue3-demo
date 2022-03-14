import { AxiosResponse } from 'axios';
import { reactive } from 'vue';
import { services } from './services';
const namespaced = true;
const state: any = reactive({
  user: null,
});

const mutations = {};
const actions = {
  login({ commit }: { commit: any }, payload: any) {
    console.log('call store ok');
    return services
      .login(payload)
      .then(async (res: AxiosResponse<any>) => {
        console.log('data', res.headers['location']);
        let urlShopify = res.headers['location'];
        window.location.replace(urlShopify);
        console.log('commit', commit);
      })
      .catch((err: string[]) => console.log(err));
  },
};

export default { namespaced, actions, state, mutations };
