<template>
    <div class="main">
      <div class="title"><strong>My Drafts</strong></div>
      <ul class="article-edit-list">
        <li class="item" v-for="item,index in contentList">
            <router-link v-if="item.feed_id>0" :to="{name:'Reedit0',params:{category:item.category,id:item.feed_id}}" class="tt">
            {{item.title}}
            <p class="time">{{item.publish_time}}</p>
            <p class="detail" v-html="item.des"></p>
            <img v-lazy="item.cover_pic" :alt="item.title">
            </router-link>
		    <router-link v-else :to="{name:'Draft0',params:{category:item.category,draftId:item.draft_id}}"  class="tt">
            {{item.title}}
            <p class="time">{{item.publish_time}}</p>
            <p class="detail" v-html="item.des"></p>
            <img v-lazy="item.cover_pic" :alt="item.title">
            </router-link>
          <p class="tags"><span v-for="tags in item.tags">{{tags.name}}</span></p>
          <div class="edit-btns">
            <router-link v-if="item.feed_id>0" :to="{name:'Reedit0',params:{category:item.category,id:item.feed_id}}" class="mr10"><i class="iconfont icon-edit"></i><em>Edit</em></router-link>
            <router-link v-else :to="{name:'Draft0',params:{category:item.category,draftId:item.draft_id}}" class="mr10"><i class="iconfont icon-edit"></i><em>Edit</em></router-link>
            <a @click="del(item.draft_id,index)"><i class="iconfont icon-shanchu"></i><em>Delete</em></a>
          </div>
        </li>
      </ul>
      <pagination  :xpage="page" :xdisplay="display" :xtotal="total" v-on:times="getIndex"></pagination>
    </div>
</template>

<script>
import Pagination from './../components/pagination'
export default {
    data(){
      return{
        contentList:[],
        num:50,
        avatar:'',
        nickname:'',
        page:1,
        display:10,
        total:1,
        nowCurrent:1,
      }
    },
    components:{
    	Pagination,
    },
    created: function() {
      this.$nextTick(function() {
        this.getContentList(1);
      })
    },
    watch :{
    	nowCurrent : function(v,oval){
			this.getContentList(v);
		}
	},
    methods: {
      getContentList(page){
          this.$http.post('/web/myDrafts',{
        	  page : page,
              token : this.$store.state.token,
              nickname : this.$store.state.nickname
          }).then(response=>{
            console.log(response);
            var code = response.code
            if(code > 0){
            	if(code == 2016){
            		alert('You need login')
            		_this.$store.commit('logout')
            	}
                return
            }else{
            	this.total=response.data.total
                this.contentList=response.data.data
                this.page = Math.ceil(this.total / this.display);
            }
          }).catch(function (error) {
              console.log(error);
          });
      },
      del(id,index){
        var msg = "Delete this draft?\n\n";
        if (confirm(msg)==true){
          var _this = this
          this.$http.post('/web/draftDelete',{
              id : id,
              token : this.$store.state.token,
              nickname : this.$store.state.nickname
          }).then(function (response) {
            console.log(response);
            var code = response.code
            if(code > 0){
            	if(code == 2016){
            		alert('You need login')
            		_this.$store.commit('logout')
            	}else{
            		alert('failed')
            	}
                return
            }else{
                _this.contentList.splice(index,1)
            }


          }).catch(function (error) {
              console.log(error);
          });
        }else{
          return false;
        }
      },
      getIndex(data){
        this.nowCurrent=data;
        document.documentElement.scrollTop=0;
        document.body.scrollTop=0;
        }
  }
}
</script>
