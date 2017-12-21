// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import axios from './http'
import fun from './fun'

import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'

import './assets/css/base.css'
import './assets/css/product.css'
import './assets/css/login.css'
import './assets/css/checkout.css'



Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueLazyLoad, {
    loading: "/static/loading-svg/loading-bars.svg"
});

Vue.use(infiniteScroll);
Vue.filter('currency', currency);//全局金额格式化

Vue.directive('title', {//自定义指令，定义页面标题
    inserted: function (el, binding) {
        document.title = binding.value
    }
});

Vue.use(fun);




/* eslint-disable no-new */
new Vue({
    el: '#app',
    axios,
    router,
    store,
    template: '<App/>',
    components: {App}
})
