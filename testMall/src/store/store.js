import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        nickName: '',
        cartCount: 0,
        loginModalFlag: false
    },
    mutations: {
        updataUserInfo(state, nickName) {
            state.nickName = nickName;
        },
        updataCartCount(state, cartCount) {
            state.cartCount += cartCount;
        },
        initCartCount(state, cartCount) {
            state.cartCount = cartCount;
        },
        updataLoginModalFlag(state, Boolean) {
            state.loginModalFlag = Boolean;
        }
    }
})

export default store
