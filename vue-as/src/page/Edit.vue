<template>
<div class="wrapper wrapper-edit">
  <header>
    <top-menu/>
  </header>
  <section class="content">
    <div class="inner">
    <form class="edit-post">
      <fieldset>
        <legend>Edit Post</legend>
        <div class="form-group">
          <label for="type">Type</label>
          <select class="form-control" @change="jumpType(type)" v-model="type" id="selectType">
            <option>blog</option>
            <option>drawing</option>
            <option>images</option>
            <option>videos</option>
          </select>
        </div>
        <router-view @v-type="changeType" :fdTags='featruredTags'></router-view>
      </fieldset>
    </form>
    </div>
  </section>
</div>

</template>

<script>
   import TopMenu from './../components/TopMenu'
   import  './../assets/js/jquery.tagsinput'

   export default {
        data(){
            return{
               type:'',
               featruredTags:[]
            }
        },
        components:{
            TopMenu,
        },
        mounted: function() {
            this.$nextTick(function() {
              this.getfeatruredTags();
              console.log(this.featruredTags);
              if(this.$route.params.category=='1'){
                  this.type='drawing';
              }else if(this.$route.params.category=='3'){
                  this.type='blog';
              }
            });
        },
        methods: { 
            jumpType(name){
              if(name=='blog'||name=='drawing'){
                name='article/'+name;
              }
              this.$router.push({path:'/edit/'+name});
            },
            changeType(type){
                this.type=type;
            },
            getfeatruredTags: function(){
              this.$http.get('/tag/recommand').then(res=>{
                  res.data.forEach((item, index)=>{
                    this.featruredTags.push(item.name)
                  })
              })
            },
        }
    }
</script>
