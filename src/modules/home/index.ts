import store from '@/store';
import moduleStore from './store';
import { storeKeyNameSpace } from '@/constants/stores';

const STORE_KEY = storeKeyNameSpace.HOME;

/* register module store */
if (!store.hasModule(STORE_KEY)) {
  store.registerModule(STORE_KEY, moduleStore);
}
