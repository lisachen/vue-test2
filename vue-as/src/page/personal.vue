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
            <img class="avatar" :src="avatar" alt="">
            <div class="detail">
              <!--用户名-->
              <p class="name">{{nickname}}</p>
              <!--粉丝-->
              <p class="mate"><span class="mr10">99 Fllowers</span><span>99 Fllowers</span></p>
              <p class="intr">You’ll never be able to go anywhere unless you learn how to let go.</p>
            </div>
            <div class="btns-my">
              <a href="">My Posts</a>
              <a href="#">My Drafts</a>
            </div>
          </div>
        </aside>
        <div class="main">
          <div class="title"><strong>My Posts</strong></div>
          <ul class="article-edit-list">
            <!--列表循环,我加了v-if，请改正-->
            <li class="item" v-for="item,index in contentList" v-if="index<=num">
              <a href="#" class="tt">{{item.title}}</a>
              <p class="time">{{item.publish_time}}</p>
              <p class="detail" v-html="item.des"></p>
              <img :src="item.cover_pic" >
              <p class="tags"><span v-for="tags in item.tags">{{tags.name}}</span></p>
              <div class="edit-btns">
                <span class="mr10"><i class="iconfont icon-edit"></i><em>Edit</em></span>
                <span><i class="iconfont icon-shanchu"></i><em>Delete</em></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  /*可以import +路径css*/
  import TopMenu from './../components/TopMenu'
  import FootEnd from './../components/FootEnd'
  export default {
    data(){
      return{
        contentList:[],
        num:5,
        avatar:'',
        nickname:''
      }
    },
    components:{
      TopMenu
    },
    mounted: function() {
      this.$nextTick(function() {
        this.getContentList();
        var _this=this;
        setTimeout(function () {
          _this.setDes()
        },1000)
      })
    },
    updated: function(){
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been re-rendered

      })
    },
    methods: {
      getContentList(){
        this.$http.get('http://local.api.animesama.com:888/web/recommend').then(res=>{
          this.contentList=res.data;
        })
      },
      setDes(){
        var length=this.contentList.length;
        for(var i=0;i<length;i++){
          this.contentList[i].des = this.contentList[i].des.replace(/\r\n/g, "<br>")
          this.contentList[i].des = this.contentList[i].des.replace(/\n/g, "<br>");
        }
        this.avatar=this.contentList[0].avatar;
        this.nickname=this.contentList[0].nickname
      }
    }
  }
</script>
