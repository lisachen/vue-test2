var mongoose = require('mongoose');//优先到node_modeles里加载
var Schema = mongoose.Schema;//定义模型

var productSchema = new Schema({
    "productId": {type: String},
    "productName": String,
    "salePrice": Number,
    "productNum": Number,
    "checked": Number,
    "productImage": String
})

module.exports = mongoose.model('Good', productSchema);//商品模型输出，good默认会加s，去查找goods表
