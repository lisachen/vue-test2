<template>
  <div class="wrapper wrapper-article">
    <header>
      <top-menu/>
    </header>
    <section class="content">
      <div class="inner">
          <div class="article">
            <h2 class="tt">{{itemList.feed_type == 2 ? itemList.des :itemList.title}}</h2>
            <p class="mate"><span class="by">By {{itemList.nickname}}</span><span class="time">{{itemList.publish_time}}</span></p>
           <!-- <div class="detail" v-html="itemList.content_text" v-if=""></div>-->
            <content-txt :parentMsg="itemList.content_text" v-if="notVideo==0"></content-txt>
            <content-vdo :parentUrl="itemList.url" :parentPost="itemList.cover_pic" v-else-if="notVideo==1"></content-vdo>
            <content-youtube :parentUrl="itemList.url" :parentPost="itemList.cover_pic" v-else-if="notVideo==2"></content-youtube>
            <content-image :parentImg="itemList.images" v-else-if="notVideo==3"></content-image>
            <p class="tags mb20"><i>Tag</i> <span v-for="list,index in itemList.tags">{{list.name}}</span></p>
            <p class="other mb20"><a href="javascript:;">Download App to get more fun!</a></p>
            <p class="other"><a href="javascript:;" @click="gorand">keep viewing other posts</a></p>
          </div>
      </div>
    </section>
    <div class="bt inner" id="download"><download /></div>
  </div>
</template>
<script>
  /*可以import +路径css*/
  import TopMenu from './../components/TopMenu'
  import ContentTxt from './../components/ContentTxt'
  import ContentVdo from './../components/ContentVideo'
  import ContentYoutube from './../components/ContentYoutube'
  import ContentImage from './../components/ContentImage'
  import Download from './../components/Download'
  export default {
    data(){
      return{
        itemList:{},
        notVideo:''
      }
    },
    components:{
      TopMenu,ContentTxt,ContentVdo,ContentYoutube,ContentImage,Download
    },
    mounted: function() {
      this.$nextTick(function() {
        this.getItemList();
      })
    },
    updated: function(){
        this.$nextTick(function () {
          // Code that will run only after the
          // entire view has been re-rendered
          if(this.itemList.feed_type==0){
            this.notVideo=0;
            this.itemList.content_text=this.itemList.content_text.replace(/\r\n/g,"<br>")
            this.itemList.content_text=this.itemList.content_text.replace(/\n/g,"<br>");
          }else if(this.itemList.feed_type==1){
            if(this.itemList.v_type==1){
              this.notVideo=1;
            }else if(this.itemList.v_type==2){
              this.notVideo=2;
            }
          }else if(this.itemList.feed_type==2){
            this.notVideo=3;
          }
        })
      },
    methods: {
      getItemList(){
        this.$http.get('/web/feedDetail/'+this.$route.params.id).then(res=>{
          this.itemList=res.data;
        })
      },
      gorand(){
    	  this.$http.get('/web/recommendRand/'+this.$route.params.id).then(res=>{
    		  this.$router.push({ name: 'Detail', params: { id: res.data }});
    		  this.getItemList();
          })
      }
    }

  }
</script>

<style>
img{
  display: block;
}
</style>
