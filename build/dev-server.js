/**
 * @file 开发环境服务端
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

/* eslint-disable no-console */
require('./check-versions')();
var config = require('../config');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');

// 默认调试服务器端口
var port = process.env.PORT || config.dev.port;

// 启动调试服务器时是否自动打开浏览器，默认为 false
var autoOpenBrowser = !!config.dev.autoOpenBrowser;

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: function () {}
});

// 当 html-webpack-plugin 的模版文件更新的时候，强制重新刷新调试页面
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});

// 指定需要代理的请求列表
var proxyTable = config.dev.proxyTable;

// 代理请求
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        };
    }
    app.use(proxyMiddleware(options.filter || context, options));
});

// 处理 history API 的回退情况（如果在线上环境中，也需要服务器做相应处理）
app.use(require('connect-history-api-fallback')());

// 服务器部署 webpack 打包的静态资源
app.use(devMiddleware);

// 使用热更新， 如果编译出现错误会实时展示编译错误
app.use(hotMiddleware);

// 纯静态资源服务
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

var newResolve;
var readyPromise = new Promise(function (resolve) {
    newResolve = resolve;
});

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n');

    // 当测试环境下，不需要打开浏览器
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }
    newResolve();
});

var server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: function () {
        server.close();
    }
};
