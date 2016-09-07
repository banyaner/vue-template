# once-again


## build setup

``` bash
# install dependencies
npm install

## 开发 serve with hot reload at localhost:8080

```js
npm run dev
```

#  发布

```js
npm run build
```

## 上传到测试服务器

```js
gulp test
```

## 上传到发布器

```js
gulp publish
```

# about files

1. 共用样式放在 src/css 目录下， *.vue内样式均私有化
1. 样式文件import进入口文件，不要直接放在html中
1. vue中的样式最终会被抽取出来，所有的样式一同打包到index.min.css中
