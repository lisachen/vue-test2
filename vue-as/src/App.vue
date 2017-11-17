<template>
  <div id="app">
    
    <transition name="animate"><router-view></router-view></transition>
    <login/>
  </div>
</template>

<script>
  import Login from './components/Login'

  export default {
      components:{
          Login
      }  
  }

</script>
