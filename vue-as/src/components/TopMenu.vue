<template>
    <div class="menu">
      <div class="inner fn-clearfix">
        <router-link to="/" class="logo">anime same</router-link>
        <div class="btns">
          <a href="javascript:;" class="write"  @click="edit"><i class="iconfont icon-document"></i> Write A Post </a>
          <a href="javascript:;" class="login" id="login" @click="login" v-if="token===null"><i class="iconfont icon-denglu"></i> Log In</a>
          <a style="color: #FFF;" v-else>
            <div class="login"><a @click="personal" href="javascript:;"><i class="iconfont icon-denglu"></i> {{ nickname }}</a>
              <ul class="login-dropdown">
                <li><a @click="personal" href="javascript:;">My Posts</a></li>
                <li><a @click="logout" href="javascript:;">Log Out</a></li>
              </ul>
            </div>
          </a>
        </div>
      </div>
    </div>
</template>
<script>
    import '../assets/css/jquery.tagsinput.css'
    import {mapState} from 'vuex'

    export default {
        data(){
          return{
            gg:true
          }
        },
        computed: mapState({
            nickname: state => state.nickname,
            token: state => state.token
        }),
        methods:{
          edit(){
        	  if(this.token){
	              if(this.$route.params.category>0){
	                this.$router.go(0);
	              }
        		  this.$router.push('/edit');
        	  }else{
        		  this.$store.commit('change')
        	  }
          },
          login(){
            this.$store.commit('change')
          },
          logout(){
              this.$store.commit('logout')
          },
          personal(){
            this.$router.push('/Personal')
          }
        }
    }
</script>
<style>
  .login a{
    color: #fff;
  }
</style>
