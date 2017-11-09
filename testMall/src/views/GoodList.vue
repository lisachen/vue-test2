<template>
    <div>
        <header-component/>
        <breadcrumb-component>
            <span>goods</span>
        </breadcrumb-component>
        <div class="accessory-result-page accessory-page">
          <div class="container">
            <div class="filter-nav">
              <span class="sortby">Sort by:</span>
              <a href="javascript:void(0)" class="default cur">Default</a>
              <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
              <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
              <!-- filter -->
              <div class="filter stopPop" id="filter">
                <dl class="filter-price">
                  <dt>Price:</dt>
                  <dd><a href="javascript:void(0)">All</a></dd>
                  <dd>
                    <a href="javascript:void(0)">0 - 100</a>
                  </dd>
                </dl>
              </div>

              <!-- search result accessories list -->
              <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                  <ul>
                    <li v-for="item in goodsList">
                      <div class="pic">
                        <a href="#"><img v-lazy="'static/images/'+item.prodcutImg" alt=""></a>
                      </div>
                      <div class="main">
                        <div class="name">{{item.productName}}</div>
                        <div class="price">{{item.prodcutPrice}}</div>
                        <div class="btn-area">
                          <a href="javascript:;" class="btn btn--m">加入购物车</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer-component/>
    </div>
</template>
<script>
    import HeaderComponent from './../components/Header'
    import BreadcrumbComponent from './../components/Breadcrumb'
    import FooterComponent from './../components/Footer'
    import axios from 'axios'
    export default{
        data(){
            return{
                goodsList:[]
            }
        },
        components:{
            HeaderComponent,
            BreadcrumbComponent,
            FooterComponent,
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getGoodsList();
            })
        },
        methods: { 
            getGoodsList(){
                axios.get('/goods').then(res=>{
                    this.goodsList=res.data.result;
                })
            }
        },
    }
</script>

