// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import Vuex from 'vuex'
import $ from 'jquery'
import VueVideoPlayer from 'vue-video-player'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueSee from 'vue-see'
import store from './store/store'

// import ElementUI from './element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
if(localStorage.token){
	console.log(localStorage.token)
	store.commit('username', localStorage.nickname)
	store.commit('usertoken', localStorage.token)
}
import './assets/css/page.css'
import './assets/css/font_dpai727x7833di.css'


import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    loading:"/static/loading-svg/loading-bubbles.svg"
});
var options={}
Vue.use(VueSee,options)
Vue.use(VueVideoPlayer)
Vue.use(VueYouTubeEmbed)
Vue.use(Vuex)
Vue.use(MintUI)
// Vue.use(ElementUI)
Vue.config.productionTip = false

axios.interceptors.request.use(
    config => {
        config.headers['version'] = '2.1.0'
        config.headers['platform'] = 'IOS'
		config.headers['auth'] = 'f5dacee17a9715dddd3f6c946b0b1031'
		config.headers['Content-Type'] = 'application/json; charset=UTF-8'
        return config
    }, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
})
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	if(response.status == 200){
		response = response.data
	}

	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
 