// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'

import './assets/css/base.css'
import './assets/css/product.css'
import './assets/css/login.css'

Vue.config.productionTip = false;
Vue.use(VueLazyLoad,{
    loading:"/static/loading-svg/loading-bars.svg"
});
Vue.prototype.axios = axios;
Vue.use(infiniteScroll);
Vue.filter('currency',currency);//全局金额格式化

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
