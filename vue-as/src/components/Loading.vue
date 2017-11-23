<template>
    <div class="loading" v-if="loading==true">
        <img src="./../../static/loading-svg/loading-spokes.svg" alt="loading">
        <p>Loading...</p>
      </div>
</template>
<script>
    export default{
        props:['loading'],
    }
</script>
