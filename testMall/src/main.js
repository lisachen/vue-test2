// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
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
Vue.prototype.axios = axios;
Vue.use(infiniteScroll);
Vue.filter('currency', currency);//全局金额格式化

const store = new Vuex.Store({
    state: {
        nickName: '',
        cartCount: 0,
        loginModalFlag:false
    },
    mutations: {
        updataUserInfo(state, nickName) {
            state.nickName = nickName;
        },
        updataCartCount(state, cartCount) {
            state.cartCount += cartCount;
        },
        initCartCount(state, cartCount){
            state.cartCount = cartCount;
        },
        updataLoginModalFlag(state,Boolean){
            state.loginModalFlag = Boolean;
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
