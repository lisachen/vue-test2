import Vue from 'vue'
import Router from 'vue-router'

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
            component: (resolve) => {//按需加载
                require(['@/views/GoodList'], resolve)
            }
        },
        {
            path: '/cart',
            name: 'Cart',
            // 需要登录才能进入的页面可以增加一个meta属性
            meta: {
                requireAuth: true
            },
            component: (resolve) => {
                require(['@/views/Cart'], resolve)
            }
        },
        {
            path: '/address',
            name: 'Address',
            meta: {
                requireAuth: true
            },
            component: (resolve) => {
                require(['@/views/Address'], resolve)
            }
        },
        {
            path: '/orderConfirm',
            name: 'OrderConfirm',
            meta: {
                requireAuth: true
            },
            component: (resolve) => {
                require(['@/views/OrderConfirm'], resolve)
            }
        },
        {
            path: '/orderSuccess',
            name: 'OrderSuccess',
            meta: {
                requireAuth: true
            },
            component: (resolve) => {
                require(['@/views/OrderSuccess'], resolve)
            }
        }
    ]
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if (router.app.$options.store.state.nickName!=='') {// 判断是否登录
            next()
        } else {// 没登录则跳转到登录界面
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
            router.app.$options.store.commit('updataLoginModalFlag',true);
        }
    } else {
        next()
    }
})

export default router
