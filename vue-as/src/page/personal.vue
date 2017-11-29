<template>
  <div class="wrapper wrapper-center">
    <header>
      <top-menu/>
    </header>
    <section class="content">
      <div class="inner">
        <aside class="side">
          <div class="user-info">
            <!--头像-->
            <img class="avatar" :src="info.avatar" alt="">
            <div class="detail">
              <!--用户名-->
              <p class="name">{{info.nickname}}</p>
              <!--粉丝-->
              <div class="mate"><p>{{ info.myfollowing }} Following</p><p>{{ info.myfollowers }} Followers</p></div>
              <p class="intr">{{ info.intro }}</p>
            </div>
            <div class="btns-my">
              <router-link :to="{name:'MyPosts'}">My Posts</router-link>
              <router-link :to="{name:'MyDrafts'}">My Drafts</router-link>
            </div>
          </div>
        </aside>
        <router-view ></router-view>
      </div>
    </section>
  </div>
</template>
<script>
  /*可以import +路径css*/
  import TopMenu from './../components/TopMenu'
  export default {
    data(){
      return{
        info:{},
        cur:0
      }
    },
    components:{
      TopMenu,
    },
    created: function() {
      this.$nextTick(function() {
        this.getInfo()
      })
    },
    methods: {
      getInfo(id,index){
    	  var _this = this
    	  this.$http.post('/web/myInfo',{
    		  token : this.$store.state.token,
    		  nickname : this.$store.state.nickname
    	  }).then(function (response) {
          	console.log(response);
          	var code = response.code
            if(code > 0){
            	if(code == 2016){
            		alert('You need login')
            		_this.$store.commit('logout')
            	}
            	return
            }else{
            	_this.info=response.data
            }
          }).catch(function (error) {
              console.log(error);
          });
      }
    }
  }
</script>
