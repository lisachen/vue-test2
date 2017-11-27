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

router.get('/', function (req, res, next) {
    //goods?page=1&pageSize=5&sort=1
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let sort = req.param('sort');//排序方式
    let skip = (page - 1) * pageSize;
    let params = {};
    let priceLevel=req.param('priceLevel');
    let gtPrice='',ltePrice='';
    if(priceLevel!='All'){
        switch (priceLevel){
            case '0':gtPrice=0;ltePrice=500;break;
            case '1':gtPrice=500;ltePrice=1000;break;
            case '2':gtPrice=1000;ltePrice=2000;break;
        }
        params={
            salePrice:{
                $gt:gtPrice,
                $lte:ltePrice
            }
        }
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice': sort});
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

module.exports = router; //输出


