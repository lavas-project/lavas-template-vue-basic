/**
 * @file workbox-cli 配置文件
 *
 * 问题：
 * （1）目前没有具体参数文档，需要看源码分析
 * （2）broadcastChannel的兼容性在80%左右，原postMessage在98%，还待考量
 * （3）使用者如果要进行二次开发，比较困难，需要学习workbox的相关库组件，多页多入口待解决
 *  (4) precache 的更新方式不同，需要对sw-register 做相应的监听修改
 *
 * 好处：
 * （1）支持runtimeCaching的 urlPattern 配置 自定义函数
 * （2）precache 更新可以检测到指定文件的修改，只更新单个文件，而非整个缓存，
 *     但是每检测到一个文件更新，都会发送一个更新事件，所以sw-register需要做相应修改
 *
 *  https://workboxjs.org/       workbox 官网
 *
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

module.exports = {

    /**
     * SW安装后是否立即激活
     *
     * @type {boolean}
     */
    skipWaiting: true,

    /**
     * SW安装后是否立即激活
     *
     * @type {boolean}
     */
    clientsClaim: true,

    /**
     * 扫描路径，此处build后在dist目录下
     *
     * @type {string}
     */
    globDirectory: 'dist/',

    /**
     * 默认入口
     *
     * @type {string}
     */
    directoryIndex: 'index.html',

    /**
     * broadcastChannelName
     * postMessage 管道
     *
     * @type {string}
     */
    precacheChannelName: 'precache-updates',

    /**
     * url校验的一些可忽略的参数
     *
     * @type {Array}
     */
    ignoreUrlParametersMatching: [/^utm_/],

    /**
     * 需要缓存的一些文件规则
     *
     * @type {Array}
     */
    globPatterns: [
      '**/*.{html,js,css,json}'
    ],

    /**
     * 生成的sw.js文件路径
     *
     * @type {string}
     */
    swDest: 'dist/service-worker.js',

    /**
     * 忽略的缓存文件
     *
     * @type {Array}
     */
    globIgnores: [
      '../workbox-cli-config.js',
      '**/sw-register.js'
    ],

    /**
     * 缓存的单个文件大小限制
     *
     * @type {boolean}
     */
    maximumFileSizeToCacheInBytes: 4194304,

    /**
     * 需要根据路由动态处理的文件
     *
     * @type {Array}
     */
    runtimeCaching: [
      {
          urlPattern: '/a/a',
          handler: 'cacheFirst',
          options: {
              cacheName: 'example-cache',
              cacheExpiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 7 * 24 * 60 * 60
              },
              broadcastCacheUpdate: {
                  channelName: 'example-channel-name'
              },
              cacheableResponse: {
                  statuses: [0, 200, 404],
                  headers: {
                      'Example-Header-1': 'Header-Value-1',
                      'Example-Header-2': 'Header-Value-2'
                  }
              }
              // ,
              // plugins: [
              //     // Additional Plugins
              // // 可单独添加broadcast cache update组件，会单独检测指定缓存内的文件
              // ]
          }
      },
      {
          urlPattern: function (opt) {
              var e = opt.event || {};
              if (e.request) {
                  // console.log();
              }
          },
          handler: 'networkFirst'
      }
    ]
};
