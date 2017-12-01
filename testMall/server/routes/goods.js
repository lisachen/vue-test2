//二级路由
var express = require('express');//加载express框架
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/testMall'); //链接数据库

mongoose.connection.on("connected", function () {
    console.log('链接成功');
})

mongoose.connection.on("error", function () {
    console.log('链接失败');
})

mongoose.connection.on("disconnected", function () {
    console.log('链接断开');
})

//查询商品列表
router.get('/list', function (req, res, next) {
    //goods?page=1&pageSize=5&sort=1&priceLevel=0
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let sort = req.param('sort');//排序方式
    let skip = (page - 1) * pageSize;
    let params = {};
    let priceLevel = req.param('priceLevel');
    let gtPrice = '', ltePrice = '';
    if (priceLevel != 'All') {
        switch (priceLevel) {
            case '0':
                gtPrice = 0;
                ltePrice = 500;
                break;
            case '1':
                gtPrice = 500;
                ltePrice = 1000;
                break;
            case '2':
                gtPrice = 1000;
                ltePrice = 2000;
                break;
        }
        params = {
            salePrice: {
                $gt: gtPrice,
                $lte: ltePrice
            }
        }
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);

    if (typeof sort !== 'undefined') {
        goodsModel.sort({'salePrice': sort});
    }
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }

    })
})

//加入购物车
router.post('/addCart', function (req, res, next) {
    var userId = req.cookies.userId;
    var productId = req.body.productId;//post的参数通过req.body取
    var User = require('../models/users');

    User.findOne({userId: userId}, function (err, userDoc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            //console.log("userDoc:" + userDoc);
            if (userDoc) {
                let productItem = '';
                userDoc.cartList.forEach(function (item, index) {
                    if (item.productId == productId) {
                        productItem = item;
                        item.productNum++;
                    }
                })
                if (productItem) {
                    userDoc.save(function (err, doc) {
                        if (err) {
                            res.json({
                                status: '1',
                                msg: err.message
                            });
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'suc',
                            })
                        }
                    })
                } else {
                    Goods.findOne({productId: productId}, function (err1, doc1) {
                        if (err1) {
                            res.json({
                                status: '1',
                                msg: err1.message
                            });
                        } else {
                            if (doc1) {
                                doc1.productNum = 1;
                                doc1.checked = 1;
                                userDoc.cartList.push(doc1);
                                userDoc.save(function (err2, doc2) {
                                    if (err2) {
                                        res.json({
                                            status: '1',
                                            msg: err2.message
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
            }
        }

    })
})

module.exports = router; //输出


