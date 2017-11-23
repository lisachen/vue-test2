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
                    <a href="javascript:void(0)" class="price">Price
                        <svg class="icon icon-arrow-short">
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
                            <dd><a :class="{'cur':filterFlag=='All'}" @click="startPriceFilter('All')"
                                   href="javascript:void(0)">All</a></dd>
                            <dd v-for="(price,index) in priceFilter">
                                <a :class="{'cur':filterFlag==index}" @click="startPriceFilter(index)"
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
                                        <div class="price">{{item.productPrice}}</div>
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
        <div class="md-overlay" v-show="overLayFlag" @click="closeFilterby"></div>
        <footer-component/>
    </div>
</template>
<script>
    import HeaderComponent from './../components/Header'
    import BreadcrumbComponent from './../components/Breadcrumb'
    import FooterComponent from './../components/Footer'
    import axios from 'axios'

    export default {
        data() {
            return {
                goodsList: [],
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
            }
        },
        components: {
            HeaderComponent,
            BreadcrumbComponent,
            FooterComponent,
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getGoodsList();
            })
        },
        methods: {
            getGoodsList() {
                axios.get('/goods').then(response => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.goodsList = res.result.list;
                    }
                })
            },
            showFilterby() {
                this.filterbyShow = true;
                this.overLayFlag = true;
            },
            startPriceFilter(index) {
                this.filterFlag = index;
                this.closeFilterby();
            },
            closeFilterby() {
                this.filterbyShow = false;
                this.overLayFlag = false;
            }
        },
    }
</script>

