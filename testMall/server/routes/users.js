var express = require('express');
var router = express.Router();
var User = require('../models/users');

require('../util/util');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//登录接口
router.post("/login", function (req, res, next) {
    var param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    User.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            });
        } else {
            if (doc) {
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 24
                });
                //req.session.user = doc;
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                });
            } else {
                res.json({
                    status: "1",
                    msg: '用户名或密码错误'
                });
            }
        }

    });
});

//登出接口
router.post("/loginOut", function (req, res, next) {
    res.cookie("userId", "", {
        path: '/',
        maxAge: -1
    });
    res.cookie("userName", "", {
        path: '/',
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: '',
        result: ''
    });
});

//校验登入
router.post("/checkLogin", function (req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: '',
            result: req.cookies.userName
        });
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        });
    }
});

//展示购物车
router.get('/cart', function (req, res, next) {
    var userId = req.cookies.userId;

    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.cartList
                })
            }
        }

    })
})

//购物车修改
router.post('/cartEdit', function (req, res, next) {
    var userId = req.cookies.userId;
    var productId = req.body.productId;//post的参数通过req.body取
    var checked = req.body.checked;
    var productNum = req.body.productNum;

    User.update({
        'userId': userId,
        'cartList.productId': productId
    }, {
        'cartList.$.productNum': productNum,
        'cartList.$.checked': checked
    }, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: ''
                })
            }
        }
    })
})

//购物车删除商品
router.post("/cartDel", function (req, res, next) {
    var userId = req.cookies.userId;
    var productId = req.body.productId;

    User.update({
        'userId': userId
    }, {
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
    }, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: ''
                })
            }
        }
    })
})


//展示地址
router.get('/address', function (req, res, next) {
    var userId = req.cookies.userId;

    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.addressList
                })
            }
        }

    })
})

//地址设置默认
router.post('/addressSetDefault', function (req, res, next) {
    var userId = req.cookies.userId;
    var addressId = req.body.addressId;//post的参数通过req.body取

    if (!addressId) {

    } else {
        User.findOne({userId: userId}, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                });
            } else {
                if (doc) {
                    var addressList = doc.addressList;
                    addressList.forEach(item => {
                        if (item.addressId == addressId) {
                            item.isDefault = true;
                        } else {
                            item.isDefault = false;
                        }
                    })
                    doc.save(function (err1, doc1) {
                        if (err1) {
                            res.json({
                                status: '1',
                                msg: err1.message
                            });
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'suc',
                            })
                        }
                    })
                }
            }

        })
    }
})

//删除地址
router.post("/addressDel", function (req, res, next) {
    var userId = req.cookies.userId;
    var addressId = req.body.addressId;

    User.update({
        'userId': userId
    }, {
        $pull: {
            'addressList': {
                'addressId': addressId
            }
        }
    }, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: ''
                })
            }
        }
    })
})

//新增地址
router.post("/addressAdd", function (req, res, next) {
    var userId = req.cookies.userId;
    var r1 = Math.floor(Math.random() * 10);
    var r2 = Math.floor(Math.random() * 10);
    var sysDate = new Date().Format('yyyyMMddhhmmss');
    var addressId = r1 + sysDate + r2;
    var userName = req.body.userName;
    var streetName = req.body.streetName;
    var postCode = req.body.postCode;
    var tel = req.body.tel;

    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                var newStreet = {
                    "addressId": addressId,
                    "userName": userName,
                    "streetName": streetName,
                    "postCode": postCode,
                    "tel": tel,
                    "isDefault": false
                }
                doc.addressList.push(newStreet);
                doc.save(function (err1, doc1) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message
                        });
                    } else {
                        if (doc) {
                            res.json({
                                status: '0',
                                msg: '',
                                result: ''
                            })
                        }
                    }
                })
            }
        }
    })
})

//生成订单
router.post("/payMent", function (req, res, next) {
    var userId = req.cookies.userId,
        orderTotal = req.body.orderTotal,
        addressId = req.body.addressId;
    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                //获取当前用户的地址信息
                var addressInfo = '', goodsList = [];
                doc.addressList.forEach(item => {
                    if (item.addressId == addressId) {
                        addressInfo = item;
                    }
                })
                //获取当前用户购物车的购买商品
                doc.cartList.forEach(item => {
                    if (item.checked == '1') {
                        goodsList.push(item);
                    }
                })

                var platform = '622';
                var r1 = Math.floor(Math.random() * 10);
                var r2 = Math.floor(Math.random() * 10);

                var sysDate = new Date().Format('yyyyMMddhhmmss');
                var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
                var orderId = platform + r1 + sysDate + r2;

                var order = {
                    "orderId": orderId,
                    "orderTotal": orderTotal,
                    "addressInfo": addressInfo,
                    "goodsList": goodsList,
                    "orderStatus": "1",
                    "createDate": createDate
                }

                doc.orderList.push(order);

                doc.save(function (err1, doc1) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message
                        });
                    } else {
                        if (doc) {
                            res.json({
                                status: '0',
                                msg: '',
                                result: {
                                    orderId: order.orderId,
                                    orderTotal: order.orderTotal
                                },
                            })
                        }
                    }
                })
            }
        }

    })
})

//根据订单id得到订单列表
router.get("/getOrder", function (req, res, next) {
    var userId = req.cookies.userId,
        orderId = req.param('orderId');
    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                var orderTotal = 0;
                doc.orderList.forEach(item => {
                        if (item.orderId == orderId) {
                            orderTotal = item.orderTotal;
                        }
                    }
                )
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        orderTotal: orderTotal
                    },
                })
            }
        }
    })
})

//获取购物车数量
router.get("/getCartCount", function (req, res, next) {
    if (req.cookies && req.cookies.userId) {
        var userId = req.cookies.userId;
        User.findOne({userId: userId}, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                });
            } else {
                if (doc) {
                    var cartCount = 0;
                    doc.cartList.forEach(item => {
                            cartCount += parseInt(item.productNum);
                        }
                    )
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            cartCount: cartCount
                        },
                    })
                }
            }
        })
    }
})

module.exports = router;


