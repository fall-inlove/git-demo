import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(VueCookies);
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://localhost:8080/api"
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
