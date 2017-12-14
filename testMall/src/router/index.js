import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'
/*
import GoodList from '@/views/GoodList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
*/

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'GoodList',
            //component: GoodList,
            component: resolve => require(['@/views/GoodList'], resolve)//按需加载
        },
        {
            path: '/cart',
            name: 'Cart',
            // 需要登录才能进入的页面可以增加一个meta属性
            meta: {//路由元信息
                requireAuth: true,
                title:'购物车'
            },
            component: resolve => require(['@/views/Cart'], resolve)
        },
        {
            path: '/address',
            name: 'Address',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/Address'], resolve)
        },
        {
            path: '/orderConfirm',
            name: 'OrderConfirm',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/OrderConfirm'], resolve)
        },
        {
            path: '/orderSuccess',
            name: 'OrderSuccess',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/OrderSuccess'], resolve)
        }
    ]
})

//通过路由设置标题
router.beforeEach((to, from, next) => {
    if (typeof to.meta.title !== 'undefined') {
        document.title=to.meta.title;
    }
    next();
})


// 页面刷新时，重新赋值
if (window.localStorage.getItem('nickName')) {
    store.commit('updataUserInfo', window.localStorage.getItem('nickName'));

}

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        //if (router.app.$options.store.state.nickName!=='') {// 判断是否登录,页面一刷新vuex管理的状态就会消失，所以在页面刷新时要重新赋值
        //if (localStorage.getItem('nickName')) {
        if (store.state.nickName) {
            next();
        } else {// 没登录则跳转到登录界面
            next({
                path: '/',
                query: {redirect: to.fullPath}//?redirect=%2Fcart
            })
            store.commit('updataLoginModalFlag',true);
        }
    } else {
        next();
    }
})

/*router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.nickName) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})*/

export default router
