<template>
    <div class="wrapper wrapper-index">
        <header>
            <top-menu/>
            <div class="banner">
              <div class="inner">
                <div class="txt">
                  <h1>Anime Sama</h1>
                  <h2>The Best Pocket Community App</h2>
                  <div class="download">
                    <a href="#" class="btn-google"><i class="iconfont icon-google-play"></i><p class="tt-s">Download on</p><p class="tt-l">Google Play</p></a>
                    <a href="#" class="btn-app"><i class="iconfont icon-ios"></i><p class="tt-s">Download on</p><p class="tt-l">App Store</p></a>
                    <a href="#" class="btn-apk"><i class="iconfont icon-android"></i><p class="tt-s">Download</p><p class="tt-l">Apk v1.1.1</p></a>

                  </div>
                  <div class="ewm">
                    <img src="../assets/img/ewm.jpg" alt="QR Code">
                    <p>Scan to Get App</p>
                  </div>
                  <p class="note">Note: the app is only available on android 4.1 and upper versions.</p>
                </div>
              </div>
            </div>
        </header>
        <section class="content">
            <div class="inner">
                <div class="title"> <strong>Find A New World</strong></div>
                <ul class="article-list">
                    <li class="item" v-for="item,index in articleList">
                        <router-link :to="{name:'Detail',params:{id:item.feed_id}}" class="preview">
                            <img v-lazy="item.cover_pic" :alt="item.title"></router-link>
                        <div class="info">
                            <span class="author">
                                <img class="avatar" v-lazy="item.avatar" :alt="item.nickname"> <em>{{item.nickname}}</em>
                            </span>
                            <span class="time">{{item.publish_time}}</span>
                        </div>
                      <router-link :to="{name:'Detail',params:{id:item.feed_id}}" class="tt">{{item.title}}</router-link>
                        <p class="detail">{{item.des}}</p>
                        <p class="tags">
                            <span v-for="tag in item.tags">{{tag.name}}</span>
                        </p>
                    </li>
                </ul>
                <div class="fn-tc">
                    <a href="#" class="btn-more">Download Anime Sama App to Get More Fun</a>
                </div>
            </div>
        </section>
        <footer class="footer">
            <div class="inner">
                <div class="tabs">
                    <router-link :to="{name:'About'}">About</router-link><router-link :to="{name:'TermsOfService'}" >Terms of Service</router-link><router-link :to="{name:'PrivacyPolicy'}" >Privacy Policy</router-link>
                </div>
                <ul class="tab-cont">
                    <router-view></router-view>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
    import TopMenu from './../components/TopMenu'
    //import './../assets/js/masonry.pkgd.min'
    export default {
        data(){
            return{
                articleList:[],
            }
        },
        components:{
            TopMenu,
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getArticleList();
            })
        },
        methods: {
            getArticleList(){
                this.$http.get('http://local.api.animesama.com:888/web/recommend').then(res=>{
                    this.articleList=res.data;
                })
            }
        }
    }
/*
    $(function(){
          $('.article-list').masonry({
            // options
            itemSelector: '.item',
            gutter: 20,
            isAnimated: true,
        });
     })
     */
</script>



