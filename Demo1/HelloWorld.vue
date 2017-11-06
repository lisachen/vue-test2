<!--
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Counter v-bind:num="num"></Counter>--><!-- 调用组件 v-bind 绑定动态变量 --><!-- 
    <p>父组件：{{num}}</p>
  </div>
</template>


<script>
import Counter from './conuter' //导入组件
export default {
  name: 'HelloWorld',
  data () {
    return {
      num:10,
      msg: 'Welcome '
    }
  },
  components:{//注册局部组件
    Counter //加载组件
  }
}
</script>
-->

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Counter v-bind:num="num" v-on:dec="decrement" @incre="increment"></Counter><!-- dec 自定义事件-->
    <p>父组件：{{num}}</p>
  </div>
</template>

<script>
import Counter from './conuter'
export default {
  name: 'HelloWorld',
  data () {
    return {
      num:10,
      msg: 'Welcome '
    }
  },
  components:{//注册局部组件
    Counter
  },
  methods:{
    decrement(){
      this.num--;
    },
    increment(){
      this.num++;
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
