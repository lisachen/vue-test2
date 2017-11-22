<template>
  <nav v-if="xpage > 1" class="pagination_nav">
    <ul class="pagination">
      <li><a href="javascript:;" v-show="xpage > 5" @click="goto(1)"> First </a></li>
      <li v-for="n in pages" :class="{ 'active': n  == ocurrent }"><a href="javascript:;" @click="goto(n)" :key="n"> {{ n  }} </a></li>
      <li><a href="javascript:;" v-show="xpage > 5" @click="goto(xpage)"> Last</a></li>
    </ul>
    <div></div>
  </nav>
</template>
<script>
  export default {
    data(){
      return{
        ocurrent:1,
        showItem:5,
      }
    },
    props:['xpage','xdisplay','xtotal'],
    computed:{
      pages:function(){
        var pag = [];
        if( this.ocurrent < this.showItem ){ //如果当前的激活的项 小于要显示的条数
          //总页数和要显示的条数那个大就显示多少条
          var i = Math.min(this.showItem,this.xpage);
          while(i){
            pag.unshift(i--);
          }
        }else{ //当前页数大于显示页数了
          var middle = this.ocurrent - Math.floor(this.showItem / 2 ),//从哪里开始
            i = this.showItem;
          if( middle >  (this.xpage - this.showItem)  ){
            middle = (this.xpage - this.showItem) + 1
          }
          while(i--){
            pag.push( middle++ );
          }
        }
        return pag
      }
    },
    methods:{
      goto:function(index){
        console.log(index)
        this.$emit('times',index);
        if(index == this.ocurrent) return;
        this.ocurrent = index;

      }
    }
  }
</script>
