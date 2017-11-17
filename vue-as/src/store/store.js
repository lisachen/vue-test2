import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    loginBox:false,
    nickname:'',
    token:null
  },
  mutations:{
    change(state){
      if(state.loginBox==false){
        state.loginBox=true
      }else{
        state.loginBox=false
      }
    },
    username(state, data){
        localStorage.nickname = data;
        state.nickname = data;
    },
    usertoken(state, data){
        localStorage.token = data;
        state.token = data;
    },
    logout(state){
        localStorage.removeItem('token');
        localStorage.removeItem('nickname');
        state.token = null;
        state.nickname = '';
    }
  }
})


