exports.install = function (Vue, options) {
    Vue.prototype.setLocalstorage = function (key,value){
        if(!window.localStorage){
            alert("浏览器不支持localstorage");
            return false;
        }else{
            var storage=window.localStorage;
            storage.setItem(key,value);
        }
    };
    Vue.prototype.removeLocalstorage = function (key){
        if(!window.localStorage){
            alert("浏览器不支持localstorage");
            return false;
        }else{
            var storage=window.localStorage;
            storage.removeItem(key);
        }
    };
};

