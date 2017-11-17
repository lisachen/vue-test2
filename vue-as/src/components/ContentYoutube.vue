<template>
  <div class="detail">{{videoId}}
    <youtube :video-id="parentUrl" player-width="100%" player-height="400" :player-vars="{autoplay: 0}" :poster="parentPost">

    </youtube>
  </div>
</template>
<script>
  export default {
    props:['parentUrl','parentPost'],
    data(){
      return{
      }
    },
    methods: {
      ready(player) {
        this.player = player
      },
      playing(player) {
        // The player is playing a video.
      },
      stop() {
        this.player.stopVideo()
      },
      pause() {
        this.player.pauseVideo()
      }
    }
  }
</script>
