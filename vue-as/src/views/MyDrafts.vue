<template>
    <div class="main">
      <div class="title"><strong>My Drafts</strong></div>
      <ul class="article-edit-list">
        <li class="item" v-for="item,index in contentList" v-if="index>=(current-1)*display&&index<current*display">
          <router-link :to="{name:'Detail',params:{id:item.feed_id}}" class="tt">{{item.title}}</router-link>
          <p class="time">{{item.publish_time}}</p>
          <p class="detail" v-html="item.des"></p>
          <router-link :to="{name:'Detail',params:{id:item.feed_id}}" class="tt"><img :src="item.cover_pic" ></router-link>
          <p class="tags"><span v-for="tags in item.tags">{{tags.name}}</span></p>
          <div class="edit-btns">
            <router-link v-if="item.feed_type==0" :to="{name:'Draft'+item.feed_type,params:{id:item.feed_id}}" class="mr10"><i class="iconfont icon-edit"></i><em>Edit</em></router-link>
            <a @click="del(item.feed_id,index)"><i class="iconfont icon-shanchu"></i><em>Delete</em></a>
          </div>
        </li>
      </ul>
      <nav v-if="page > 1" class="pagination_nav">
        <ul class="pagination">
          <li><a href="javascript:;" v-show="current > 1" @click="current =1"> Home </a></li>
          <li><a href="javascript:;" v-show="current > 1" @click="--current"> Previous </a></li>
          <li v-for="n in page" :class="{ 'active': n  == current }"><a href="javascript:;" @click="current = n "> {{ n  }} </a></li>
          <li><a href="javascript:;" v-show="current < page" @click="++current"> Next</a></li>
          <li><a href="javascript:;" v-show="current < page" @click="current = page">End</a></li>
        </ul>
        <div></div>
        <ul class="pagination pull-right">
          <li><span> Total {{ total }} data </span></li>
          <li><span>{{ display }} pieces of data per page </span></li>
          <li><span> A total of {{ page }} pages </span></li>
          <li><span> Current page {{ current }} </span></li>
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
    data(){
      return{
        contentList:[],
        num:50,
        avatar:'',
        nickname:'',
        page:1,
        display:5,
        total:1,
        current:1,
      }
    },
    components:{
    },
    created: function() {
      this.$nextTick(function() {
        this.getContentList();
      })
    },
  /*  mounted:function(){
      this.$nextTick(function() {

      })
    },*/
    updated: function(){
      this.$nextTick(function () {
        this.total = this.contentList.length;
        this.page = Math.ceil(this.total / this.display);
        console.log( this.page)
        console.log(this.contentList.length)
      })
    },
    methods: {
      getContentList(){
          var _this = this
          this.$http.post('http://local.api.animesama.com:888/web/myPost',{
              token : this.$store.state.token,
              nickname : this.$store.state.nickname
          }).then(function (response) {
            console.log(response);
            var code = response.code
            if(code > 0){
                alert(response.message)
                if(code == 2016){
                    _this.$store.commit('logout')
                }
                return
            }else{
                _this.contentList=response.data
            }
          }).catch(function (error) {
              console.log(error);
          });
      },
      del(id,index){
          var _this = this
          this.$http.post('http://local.api.animesama.com:888/web/delete',{
              feed_id : id,
              token : this.$store.state.token,
              nickname : this.$store.state.nickname
          }).then(function (response) {
            console.log(response);
            var code = response.code
            if(code > 0){
                alert(response.message)
                if(code == 2016){
                    _this.$store.commit('logout')
                }
                return
            }else{
                _this.contentList.splice(index,1)
            }


          }).catch(function (error) {
              console.log(error);
          });
      }
  }
}  
</script>
