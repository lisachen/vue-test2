<template>
    <div class="checkout-page" v-title="'选择配送地址'">
        <header-component/>
        <breadcrumb-component>
            <span>Address</span>
        </breadcrumb-component>
        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <symbol id="icon-add" viewBox="0 0 31 32">
                    <title>add</title>
                    <path class="path1"
                          d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"></path>
                </symbol>
                <symbol id="icon-ok" viewBox="0 0 32 32">
                    <title>ok</title>
                    <path class="path1"
                          d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
                </symbol>
                <symbol id="icon-edit" viewBox="0 0 32 32">
                    <title>edit</title>
                    <path class="path1"
                          d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
                </symbol>
                <symbol id="icon-del" viewBox="0 0 32 32">
                    <title>delete</title>
                    <path class="path1"
                          d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
                    <path class="path2"
                          d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                    <path class="path3"
                          d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                    <path class="path4"
                          d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                </symbol>
                <symbol id="icon-clock" viewBox="0 0 32 32">
                    <title>clock</title>
                    <path class="path1"
                          d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
                </symbol>
                <symbol id="icon-question" viewBox="0 0 32 32">
                    <title>question</title>
                    <path class="path1"
                          d="M16 2.56c7.411 0 13.44 6.029 13.44 13.44s-6.029 13.44-13.44 13.44c-7.411 0-13.44-6.029-13.44-13.44s6.029-13.44 13.44-13.44zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
                    <path class="path2"
                          d="M16 22.080c-1.059 0-1.92 0.861-1.92 1.92s0.861 1.92 1.92 1.92c1.059 0 1.92-0.861 1.92-1.92s-0.861-1.92-1.92-1.92z"></path>
                    <path class="path3"
                          d="M12.16 12.48c0.706 0 1.28-0.574 1.28-1.28 0-1.412 1.148-2.56 2.56-2.56s2.56 1.148 2.56 2.56c0 1.412-1.148 2.56-2.56 2.56-0.706 0-1.28 0.574-1.28 1.28v3.84c0 0.706 0.574 1.28 1.28 1.28s1.28-0.574 1.28-1.28v-2.723c2.224-0.575 3.84-2.616 3.84-4.957 0-2.823-2.297-5.12-5.12-5.12s-5.12 2.297-5.12 5.12c0 0.706 0.574 1.28 1.28 1.28z"></path>
                </symbol>
            </defs>
        </svg>
        <div class="container">
            <div class="checkout-addr">
                <div class="page-title-normal">
                    <h2 class="page-title-h2"><span>check out</span></h2>
                </div>
                <!-- process step -->
                <div class="check-step">
                    <ul>
                        <li class="cur"><span>Confirm</span> address</li>
                        <li><span>View your</span> order</li>
                        <li><span>Make</span> payment</li>
                        <li><span>Order</span> confirmation</li>
                    </ul>
                </div>

                <!-- address list -->
                <div class="page-title-normal checkout-title">
                    <h2><span>Shipping address</span></h2>
                </div>
                <div class="addr-list-wrap">
                    <div class="addr-list">
                        <ul>
                            <li v-for="(item,index) in addressListFilter" :class="{'check':checkFlag==index}"
                                @click="checkFlag=index;curAddressId=item.addressId">
                                <dl>
                                    <dt>{{item.userName}}</dt>
                                    <dd class="address">{{item.streetName}}</dd>
                                    <dd class="tel">{{item.tel}}</dd>
                                </dl>
                                <div class="addr-opration addr-edit">
                                    <a href="javascript:;" class="addr-edit-btn" @click="editConfirm(item)">
                                        <svg class="icon icon-edit">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                 xlink:href="#icon-edit"></use>
                                        </svg>
                                    </a>
                                </div>
                                <div class="addr-opration addr-del">
                                    <a href="javascript:;" class="addr-del-btn" @click="delConfirm(item.addressId)">
                                        <svg class="icon icon-del">
                                            <use xlink:href="#icon-del"></use>
                                        </svg>
                                    </a>
                                </div>
                                <div class="addr-opration addr-default" v-if="item.isDefault">Default address</div>
                                <div class="addr-opration addr-set-default" v-else @click="setDefault(item.addressId)">
                                    <a href="javascript:;" class="addr-set-default-btn"><i>Set default</i></a>
                                </div>
                            </li>
                            <li class="addr-new" @click="addConfirm">
                                <div class="add-new-inner">
                                    <i class="icon-add">
                                        <svg class="icon icon-add">
                                            <use xlink:href="#icon-add"></use>
                                        </svg>
                                    </i>
                                    <p>Add new address</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="shipping-addr-more" v-if="addressCount>3" :class="{'open':limitLen>3}">
                        <a class="addr-more-btn up-down-btn" href="javascript:;" @click="addressMore">
                            more
                            <i class="i-up-down">
                                <i class="i-up-down-l"></i>
                                <i class="i-up-down-r"></i>
                            </i>
                        </a>
                    </div>
                </div>

                <!-- shipping method-->
                <div class="page-title-normal checkout-title">
                    <h2><span>Shipping method</span></h2>
                </div>
                <div class="lemall-msg-info hidden">
                    <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
                </div>
                <div class="shipping-method-wrap">
                    <div class="shipping-method">
                        <ul>
                            <li class="check">
                                <div class="name">Standard shipping</div>
                                <div class="price">Free</div>
                                <div class="shipping-tips">
                                    <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="next-btn-wrap">
                    <router-link class="btn btn--m btn--red"
                                 :to="{'name':'OrderConfirm',query: {'addressId': curAddressId}}">Next
                    </router-link>
                </div>
            </div>
        </div>
        <footer-component/>
        //新增地址
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':addModalShow}" id="showModalw">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="addModalShow=false">关闭</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="error-wrap" v-if="errorTip">
                            <span class="error error-show">{{errorTxt}}</span>
                        </div>
                        <div class="md-form-item">
                            <label class="md-form-item__label" style="width: 80px;">
                                *姓名
                            </label>
                            <div class="md-form-item__content" style="margin-left: 80px;">
                                <div class="el-input">
                                    <input type="text" autocomplete="off" class="md-input__inner" v-model="newUserName">
                                </div>
                            </div>
                        </div>
                        <div class="md-form-item">
                            <label class="md-form-item__label" style="width: 80px;">
                                *地址
                            </label>
                            <div class="md-form-item__content" style="margin-left: 80px;">
                                <div class="el-input">
                                    <input type="text" autocomplete="off" class="md-input__inner"
                                           v-model="newStreetName">
                                </div>
                            </div>
                        </div>
                        <div class="md-form-item">
                            <label class="md-form-item__label" style="width: 80px;">
                                邮编
                            </label>
                            <div class="md-form-item__content" style="margin-left: 80px;">
                                <div class="el-input">
                                    <input type="text" autocomplete="off" class="md-input__inner" v-model="newPostCode">
                                </div>
                            </div>
                        </div>
                        <div class="md-form-item">
                            <label class="md-form-item__label" style="width: 80px;">
                                *电话号码
                            </label>
                            <div class="md-form-item__content" style="margin-left: 80px;">
                                <div class="el-input">
                                    <input type="text" autocomplete="off" class="md-input__inner" v-model="newTel">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-wrap col-2">
                        <button class="btn btn--s" id="btnModalConfirms" @click="saveAddress">保存</button>
                        <button class="btn btn--s btn--red" id="btnModalCancels" @click="addModalShow=false">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="addModalShow" @click="addModalShow=false"></div>
        <Modal :mdShow="mdShowConfirm" @close="mdClose">
            <p slot="massage">你确认删除此条地址？</p>
            <div slot="btnGroup" class="btn-wrap">
                <a class="btn btn--m" @click="delAddress">确定</a>
                <a class="btn btn--m" @click="mdClose">取消</a>
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
                addressList: [],
                addressCount: '',
                curAddressId: '',
                mdShowConfirm: false,
                checkFlag: 0,
                limitLen: 3,
                addModalShow: false,
                newUserName: '',
                newStreetName: '',
                newPostCode: '',
                newTel: '',
                errorTip: false,
                errorTxt: '',
                isAddAddress:false,
                curAddressId:''
            }
        },
        components: {HeaderComponent, BreadcrumbComponent, FooterComponent, Modal},
        computed: {
            addressListFilter() {
                this.addrIsMore = this.addressList.length > this.limitLen ? true : false;
                return this.addressList.slice(0, this.limitLen);//返回全新的数据
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getAddressList();
            })
        },
        methods: {
            getAddressList() {
                this.axios.get('/users/address').then(response => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.addressList = res.result;
                        var key = '', i = 0;
                        this.addressList.forEach(item => {
                            if (item.isDefault == true) {
                                var index = this.addressList.indexOf(item);
                                key = item;
                                this.addressList.splice(index, 1);
                                this.curAddressId = item.addressId;
                            }
                            i++;
                        })
                        this.addressList.unshift(key);
                        this.addressCount = i;
                    } else {
                        console.log(res.msg);
                    }
                })
            },
            setDefault(addressId) {
                this.axios.post("/users/addressSetDefault", {
                    addressId: addressId
                }).then(res => {
                    var res = res.data;
                    if (res.status == 0) {
                        this.getAddressList();
                    } else {
                        console.log(res.msg);
                    }
                })
            },
            delConfirm(addressId) {
                //this.curAddressId = addressId;
                if (this.addressList.length > 1) {
                    this.mdShowConfirm = true;
                } else {
                    alert('至少有一条地址');
                }
            },
            mdClose() {
                this.mdShowConfirm = false;
            },
            delAddress() {
                this.axios.post("/users/addressDel", {
                    addressId: this.curAddressId
                }).then(res => {
                    var res = res.data;
                    if (res.status == '0') {
                        this.mdShowConfirm = false;
                        this.getAddressList();
                    } else {
                        console.log(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            addressMore() {
                if (this.limitLen == 3) {
                    this.limitLen = this.addressList.length;
                } else {
                    this.limitLen = 3;
                }
            },
            addConfirm() {
                this.isAddAddress=true;
                this.addModalShow = true;
                this.newUserName = this.newStreetName = this.newPostCode=this.newTel = '';
                this.errorTip = false
            },
            saveAddress() {
                if (this.newUserName == '' || this.newStreetName == '' || this.newTel == '') {
                    this.errorTip = true;
                    this.errorTxt = '收件人/收件地址/收件电话不能为空！';
                    return;
                }
                let postUrl;
                if(this.isAddAddress){
                    postUrl='/users/addressAdd';
                }else{
                    postUrl='/users/addressEdit';
                }
                this.axios.post(postUrl, {
                    "addressId":this.curAddressId,
                    "userName": this.newUserName,
                    "streetName": this.newStreetName,
                    "postCode": this.newPostCode,
                    "tel": this.newTel,
                }).then(response => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.addModalShow = false;
                        this.getAddressList();
                    } else {
                        console.log(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            editConfirm(item) {
                this.isAddAddress=false;
                this.addModalShow = true;
                this.newUserName = item.userName;
                this.newStreetName = item.streetName;
                this.newPostCode= item.postCode
                this.newTel = item.tel;
            }
        }
    }
</script>
