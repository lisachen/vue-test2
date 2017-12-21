//使用express作为后端框架，结合一些关于webpack的中间件，搭建了一个开发环境。

'use strict'
require('./check-versions')()

// 配置文件
const config = require('../config')
// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// 可以强制打开浏览器并跳转到指定 url 的插件
// https://github.com/sindresorhus/opn
const opn = require('opn')
// node自带的文件路径工具
const path = require('path')
// express框架
const express = require('express')
const webpack = require('webpack')
// 测试环境，使用的配置与生产环境的配置一样
// 非测试环境，即为开发环境，因为此文件只有测试环境和开发环境使用
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
    // 生产环境配置文件
    ? require('./webpack.prod.conf')
    // 开发环境配置文件
    : require('./webpack.dev.conf')

// 端口号为命令行输入的PORT参数或者配置文件中的默认值
const port = process.env.PORT || config.dev.port
// 配置文件中 是否自动打开浏览器
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// 配置文件中 http代理配置
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

// 启动 express 服务
const app = express()
//启动 webpack 编译
const compiler = webpack(webpackConfig)

// 可以将编译后的文件暂存到内存中的插件
// https://github.com/webpack/webpack-dev-middleware
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    // 公共路径，与webpack的publicPath一样
    publicPath: webpackConfig.output.publicPath,
    // 不打印
    quiet: true
})

// Hot-reload 热重载插件
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// 当tml-webpack-plugin template 更改之后，强制刷新浏览器
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    // 如果 options 的数据类型为 string，则表示只设置了 url，
    // 所以需要将url设置为对象中的 target 的值
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// 拼接 static 文件夹的静态资源路径
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 静态文件服务
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
// 编译成功后打印网址信息
devMiddleware.waitUntilValid(() => {
    portfinder.getPort((err, port) => {
        if (err) {
            _reject(err)
        }
        process.env.PORT = port
        var uri = 'http://localhost:' + port
        console.log('> Listening at ' + uri + '\n')
        // when env is testing, don't need open it
        // 如果配置了自动打开浏览器，且不是测试环境，则自动打开浏览器并跳到我们的开发地址
        if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            opn(uri)
        }
        server = app.listen(port)
        _resolve()
    })
})

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
