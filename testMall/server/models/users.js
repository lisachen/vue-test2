var mongoose = require('mongoose');//优先到node_modeles里加载
var Schema = mongoose.Schema;//定义模型

var userSchema = new Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [
        {
            "productId": String,
            "productName": String,
            "productImage": String,
            "salePrice": String,
            "productNum": String,
            "checked": String
        }
    ],
    "addressList": [
        {
            "addressId": String,
            "userName": String,
            "streetName": String,
            "postCode": Number,
            "tel": Number,
            "isDefault": Boolean
        }
    ]
})

module.exports = mongoose.model('User', userSchema);//d默认会加s
