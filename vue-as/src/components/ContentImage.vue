<template>
  <div class="detail">
    <see-box>
      <see-item v-for="(item,index) in imgList" :key="index" :url="item.url"  :width="item.width" :height="item.height" ></see-item>
    </see-box>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        imgList:[],
        oImg:[],
      }
    },
    props:['parentImg'],
    beforeCreate:function () {
      this.$nextTick(function() {
          var _this = this;
          var width=[];
          var height=[];
          var oW=[];
          var oH=[];
          for (var i = 0; i < _this.parentImg.length; i++) {
            this.oImg[i] = new Image();
            this.oImg[i].src = _this.parentImg[i];
            oW[i]=  this.oImg[i].width;
            oH[i] =  this.oImg[i].height;
            this.imgList.push({"height": oH[i], "width": oW[i], "url": this.parentImg[i]});
            this.oImg[i].index=i;
            this.oImg[i].onload=function () {
//              console.log(this.height);
              _this.imgList[this.index].height=this.height;
              _this.imgList[this.index].width=this.width;

            }
          }

      })
    }
  }
</script>
<style>
  .article .detail figure img{
    width:100%;
    height:auto;
    margin:0 auto;
  }
</style>
