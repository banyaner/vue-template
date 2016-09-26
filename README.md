学习vue.js初衷是用组件化思想、ES6等知识来写活动项目。在vue官方模板webpack-simply，和目前基于gulp的活动模板基础上整理出一个基于vue+webpack+gulp的前端活动模板。
本模板主要考虑如下方面：
1.单页面应用
2.无复杂的路由
模板中目前只引入vue-touch插件（如果只使用点击事件可以去掉）。
对于复杂页面需要引入vue-router、vuex进行路由控制和数据管理。


# 功能介绍

1. 支持ES6
1. 支持热加载、热替换
1. 支持code split
1. 支持sass编译
1. ftp上传

# 组织结构

<pre>
.
├── dist    //生成文件目录
│   ├── css
│   │   ├── index.min.css
│   │   └── index.min.css.map
│   ├── img
│   │   └── 0972e7d7.common-pc-logo.png
│   ├── index.html
│   └── js
│       ├── bundle.js
│       └── bundle.js.map
├── node_modules
├── gulpfile.js
├── package.json
├── src //开发目录
│   ├── css
│   │   ├── common.css
│   │   ├── index.css
│   │   └── lib
│   │       └── normalize.css
│   ├── img
│   │   ├── common-landscape-phone.png
│   │   ├── common-pc-logo.png
│   │   ├── common-share-tip.png
│   │   └── share
│   │       └── share-icon.png
│   ├── index.html
│   ├── js
│   │   ├── lib
│   │   │   ├── NewsAppClient.js
│   │   │   ├── common.js
│   │   │   └──fix-viewport.js
│   │   └── main.js //入口文件 控制窗口切换，历史记录
│   └── views
│       ├── FirstPage.vue
│       ├── SecondPage.vue
└── webpack.config.js
</pre>

# index.html

```ruby
<div class="common-container" id="page">
<!--可替换组件 组件转换效果-->
    <component :is="currentView" transition="fade" transition-mode="out-in" keep-alive>
    </component>
</div>
```
由于活动项目中页面比较少，均采用单页面实现。所以我采用切换组件的方式实现路由管理。
所以main.js中写成
```ruby
import '../css/lib/normalize.css'
import '../css/common.css'
import '../css/index.css'
import Vue from 'vue'
import VueTouch from 'vue-touch'    //需要时引入vue-touch插件
Vue.use(VueTouch)
import FirPage from './../views/FirPage.vue'
import SecPage from './../views/SecPage.vue'
let vm = new Vue({
    el: '#page',
    data: {
        currentView: 'firPage'
    },
    components: {
        FirPage, SecPage
    },
    methods: {
        //切换组件
        showSecPage: function () {
            NewsAppShare.show()
            this.currentView = 'secPage'
            history.pushState({page: this.currentView}, "", location.href);
            console.log(history.state)

        }
    }
});
history.replaceState({page: "firPage"}, "", 'index.html');
window.addEventListener('popstate', function(event) {
    vm.currentView=event.state.page;
});

```
考虑页面是多屏的，则将每一屏写成一个组件（FirtPage.vue, SecondPage.vue...）。然后通过currentView切换视图。
历史栈则采用history API实现

# webpack配置 webpack.config.js

之前配置完后热加载一直无效。后来发现时output配置出了问题，代码如下：
```ruby
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var debug = process.env.NODE_ENV !== 'production' //判断环境
module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/',
        './src/js/main.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/bundle.js',
        chunkFilename: 'js/[id].chunk.js',
        publicPath: debug ? '/dist/' : './' //为开发和部署环境设置不同路径
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/index.min.css", {allChunks: true}) //抽取css到单独文件index.min.css
    ],
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css', {publicPath: '../'})
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass', {publicPath: '../'})
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=10000&name=img/[hash:8].[name].[ext]' //小于10kb的图片转为base64格式
            }
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader', 'sass-loader', {publicPath: '../'})
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.entry = ['./src/js/main.js']
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}
```
执行
```ruby
$ npm run dev
```
热加载即可生效。
注意：
1.output路径配置不正确的时候 ，热加载无效。
2.如何区分生产还是开发环境
在webpack.config.js使用process.env.NODE_ENV进行判断
在package.json里面的script设置环境变量，注意mac与windows的设置方式不一样
```ruby
  "scripts": {
    "clean": "rm -rf dist",
    "copy-lib": "cp -r src/img/share dist/img/share && cp -r src/js/lib dist/js && cp src/index.html dist/index.html", //清空dist目录，并将webpack无法编译的文件复制到dist目录
    "dev": "npm run copy-lib && webpack-dev-server --inline --hot",
    "build": "npm run clean &&cross-env NODE_ENV=production webpack --progress --hide-modules && npm run copy-lib"
  },
```

相关参资料如下：
[动态组件载入 lazy load]
[基于webpack搭建前端工程解决方案探索]



# 运行
```js
$ npm install //安装依赖
$ npm run dev // 在localhost:8080/dist/index.html地址打开热加载
$ npm run build //打包代码
$ gulp test  //上传测试代码
$ gulp publish  //上传至发布服务器

```
 webpack -production //生产环境下要参数 代码打包编译使用producution参数时，可以将代码编译为bundle.js 和build.js.map，从而大幅度降低js代码的大小。


# 问题整理

1. 模板要有顶级元素，不要写成片段实例。这样transition效果才能生效，代码也比较规整。
1. 父子组件间通信主要采用下发事件的方式
1. js/lib/zepto.js 不要去替换为压缩包，因为代码中的phone属性在common.js中使用了。
1.  对于大型的项目使用webpack code splitting 和vue-router可以实现懒加载
1.  多组件共享数据时，可以将数据定义在根组件中，子组件与根组件通过事件更改数据。对于数据共享较为复杂的中型项目，引入vuex。
1.  组价切换时存在DOM未更新完成，事件已经派发的情况。可以使用nextTick，等待DOM更新，再执行回调
```js
 'game-page': function () {
            this.currentView = 'gamePage';
            let _self = this;
            Vue.nextTick(function(){
                _self.$broadcast('game-begin');
            });
        }
```
1. *.vue 的script中写入图片地址的时候会解析错误。
如果你的图片地址是写死在 <template></template> 或者 <style></style> 里的，Webpack的file-loader 会帮你处理这个图片最终的地址。 如果需要在js中写入图片地址则需要使用import
```js
    import zhou from '../img/tutor-zhou.png'
    import na from '../img/tutor-na.png'
```
1. 样式私有化
如果希望样式只在list.vue中生效，则写成
```ruby
<!--list.vue-->
<style scoped>
    //style code...
</style>
```
1. vue中使用hammer.js库模拟touch事件，也有自己的获取元素方式，所以不需要再引入zepto

# 待解决问题

1. ~~lib/ 目录下文件部分依赖zepto、以及写法非模块化，需要改写~~  已完成去除zepto依赖
2. sass编译时前缀自动补全
3. NewsAppClient.js改写成vue插件


[webpack-dev-server]:https://0xreturn.gitbooks.io/webpack/content/chapter1.html
[动态组件载入 lazy load]:http://router.vuejs.org/zh-cn/lazy.html
[基于webpack搭建前端工程解决方案探索]:http://www.infoq.com/cn/articles/frontend-engineering-webpack