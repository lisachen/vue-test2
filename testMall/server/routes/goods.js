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
  Goods.find({}, function (err, doc) {
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


