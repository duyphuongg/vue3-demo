import store from '@/store';
import moduleStore from './store';
import './i18n';
import { storeKeyNameSpace } from '@/constants/stores';

const STORE_KEY = storeKeyNameSpace.MANAGE_REVIEWS;

/* register module store */
if (!store.hasModule(STORE_KEY)) {
  store.registerModule(STORE_KEY, moduleStore);
}
