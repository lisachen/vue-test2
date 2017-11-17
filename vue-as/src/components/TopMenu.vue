<template>
    <div class="menu">
      <div class="inner fn-clearfix">
        <a href="/" class="logo">anime same</a>
        <div class="btns">
          <a href="javascript:void(0);" class="write"  @click="login"><i class="iconfont icon-document"></i> Write A Post </a>
          <a class="login" id="login" @click="login" v-if="token===null"><i class="iconfont icon-denglu"></i> Log In</a>
          <a style="color: #FFF;" v-else>
            <div class="login"><i class="iconfont icon-denglu"></i> {{ nickname }}
              <ul class="login-dropdown">
                <li><a>My Posts</a></li>
                <li><a @click="logout">Log Out</a></li>
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
          login(){
            this.$store.commit('change')
          },
          logout(){
              this.$store.commit('logout')
          }
        }
    }
</script>

</script>
