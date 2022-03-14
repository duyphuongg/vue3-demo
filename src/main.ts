import { createApp } from 'vue';
import App from './layouts/App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';
import './modules'
import registerGlobalDirectives from './plugins/global-directives';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.scss';

const app = createApp(App);

registerGlobalDirectives(app);

app.use(i18n);
app.use(store);
app.use(router);
app.mount('#app');
