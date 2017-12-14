import Vue from 'vue'
import axios from 'axios'
import store from './store/store'
import router from './router'

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;

/*
// 全局拦截器
axios.defaults.timeout = 5000;// 超时时间
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
    // Loading方法
    console.log('请求初始化');
    return config
}, error => {
    console.log('加载超时');
})
// http响应拦截器
axios.interceptors.response.use(response => {
    // 响应成功关闭loading
    console.log('请求响应后');
    return response
}, error => {
    console.log('加载失败');
})


*/
// http request 拦截器
axios.interceptors.request.use(config => {
    if (store.state.nickName) {  // 判断是否存在nickName，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `nickName: ${store.state.nickName}`;
    }
    return config;
}, err => {
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 1001:
                // 当后端接口返回401 Unauthorized（未授权），让用户重新登录
                store.commit('updataUserInfo','');
                router.replace({
                    path: '/',
                    query: {redirect: to.fullPath}//?redirect=%2Fcart
                })
                store.commit('updataLoginModalFlag',true);
        }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

export default axios
