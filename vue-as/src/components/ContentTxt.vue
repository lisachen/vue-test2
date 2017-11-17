<template>
  <div class="detail" v-html="parentMsg">
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    props:['parentMsg'],
    data(){
      return{
      }
    },
    computed: mapState({

    }),
    methods:{

    }
  }
</script>

