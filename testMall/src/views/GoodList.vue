<template>
    <div>
        <header-component :loginModalFlag="loginModalFlag" @closeLoginModal="mdClose" @openLoginModal="mdOpen"/>
        <breadcrumb-component>
            <span>Goods</span>
        </breadcrumb-component>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default" :class="{'cur':SortBy=='0'}" @click="sortDefault">Default</a>
                    <a href="javascript:void(0)" class="price" :class="{'sort-up':sortFlag,'cur':SortBy=='1'}" @click="sortPrice">Price
                        <svg class="icon icon-arrow-short" >
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a @click="showFilterby" href="javascript:void(0)" class="filterby stopPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show':filterbyShow}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a :class="{'cur':filterFlag=='All'}" @click="priceLevel('All')"
                                   href="javascript:void(0)">All</a></dd>
                            <dd v-for="(price,index) in priceFilter">
                                <a :class="{'cur':filterFlag==index}" @click="priceLevel(index)"
                                   href="javascript:void(0)">{{price.startPrice}} - {{price.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item in goodsList">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/images/'+item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="loading-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                                 infinite-scroll-distance="10" v-show="loading">
                                加载中...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closeFilterby"></div>
        <footer-component/>
        <Modal :mdShow="mdShowCart" @close="mdClose">
            <p slot="massage">成功加入购物车！</p>
            <div slot="btnGroup" class="btn-wrap">
                <a class="btn btn--m" @click="mdClose">继续购物</a>
                <router-link class="btn btn--m" href="javascript:;" to="">查看购物车</router-link>
            </div>
        </Modal>
    </div>
</template>
<script>
    import HeaderComponent from './../components/Header'
    import BreadcrumbComponent from './../components/Breadcrumb'
    import FooterComponent from './../components/Footer'
    import Modal from './../components/Modal'

    export default {
        data() {
            return {
                goodsList: [],
                sortFlag: false,
                SortBy: '0',
                page: 1,
                pageSize: 8,
                busy: true,
                loading:false,
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '2000.00'
                    },
                ],
                filterFlag: 'All',
                filterbyShow: false,
                overLayFlag: false,
                mdShowCart:false,
                loginModalFlag:false
            }
        },
        components: {
            HeaderComponent,
            BreadcrumbComponent,
            FooterComponent,
            Modal
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getGoodsList(false);
            })
        },
        methods: {
            getGoodsList(flag) {
                this.loading=true;
                let param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag ? 1 : -1,
                    priceLevel:this.filterFlag
                }
                if(this.SortBy =='0'){
                    delete param.sort;
                }
                this.axios.get('/goods/list', {
                    params: param
                }).then(response => {
                    let res = response.data;
                    this.loading=false;
                    if (res.status == '0') {
                        if (flag) {//分页是否累加
                            this.goodsList = this.goodsList.concat(res.result.list);//concat() 方法用于连接两个或多个数组。
                            if (res.result.count < this.pageSize) {
                                this.busy = true;
                            } else {
                                this.busy = false;
                            }
                        } else {
                            this.goodsList = res.result.list;
                            this.busy = false;
                        }
                    } else {
                        this.goodsList = [];
                    }
                })
            },
            loadMore(){
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getGoodsList(true);
                    this.busy = false;
                }, 1500);
            },
            sortDefault(){
                this.page = 1;
                this.SortBy = 0;
                this.getGoodsList();
            },
            sortPrice() {
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.SortBy = 1;
                this.getGoodsList();
            },
            showFilterby() {
                this.filterbyShow = true;
                this.overLayFlag = true;
            },
            priceLevel(index) {
                this.page=1;
                this.filterFlag = index;
                this.closeFilterby();
                this.getGoodsList();
            },
            closeFilterby() {
                this.filterbyShow = false;
                this.overLayFlag = false;
            },
            addCart(productId){
                this.axios.post("/goods/addCart",{
                    productId:productId
                }).then(res=>{
                    var res = res.data;
                    if(res.status==0){
                        //alert('加入成功');
                        this.mdShowCart=true;
                    }else if(res.status==1001) {//未登录
                        //alert(res.msg);
                        this.loginModalFlag=true;
                    }else{
                        alert(res.msg);
                    }
                })
            },
            mdClose(){
                this.mdShowCart=this.loginModalFlag=false;
            },
            mdOpen(){
                this.loginModalFlag=true;
            }
        },
    }
</script>

