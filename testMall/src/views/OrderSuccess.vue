<template>
    <div class="order-success-page">
        <header-component/>
        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
                <ul>
                    <li class="cur"><span>Confirm</span> address</li>
                    <li class="cur"><span>View your</span> order</li>
                    <li class="cur"><span>Make</span> payment</li>
                    <li class="cur"><span>Order</span> confirmation</li>
                </ul>
            </div>

            <div class="order-create">
                <div class="order-create-pic"><img src="../../static/images/ok-2.png" alt=""></div>
                <div class="order-create-main">
                    <h3>Congratulations! <br>Your order is under processing!</h3>
                    <p>
                        <span>Order ID：{{orderId}}</span>
                        <span>Order total：{{orderTotal}}</span>
                    </p>
                    <div class="order-create-btn-wrap">
                        <div class="btn-l-wrap">
                            <a href="javascript:;" class="btn btn--m">Cart List</a>
                        </div>
                        <div class="btn-r-wrap">
                            <a href="javascript:;" class="btn btn--m">Goods List</a>
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
    import FooterComponent from './../components/Footer'

    export default {
        data() {
            return {
                orderId:this.$router.orderId,
                orderTotal:0,
            }
        },
        components: {HeaderComponent, FooterComponent},
        mounted: function () {
            this.$nextTick(function () {
                this.getOrder();
            })
        },
        methods: {
            getOrder(){
                this.axios.get("/users/getOrder", {
                    params: {
                        orderId: this.orderId
                    }
                }).then(response => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.orderTotal=res.result.orderTotal;
                    } else {
                        console.log(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>
