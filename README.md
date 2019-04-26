`typescript`现在很火，本项目基于`typescript`，使用最新版本的依赖搭建开发环境。

项目基于最新的`webpack`4.x、`babel`7.x、`typescript`3.x

## 依赖介绍

很多人`webpack`不陌生，但对于自己的项目依赖不知道是干嘛的。
这里对项目依赖进行阐述，帮助你理解你的环境。

```javascript
//注意：以下依赖是必需的
{
    /*
    Babel 自带了一个内置的 CLI 命令行工具，可通过命令行编译文件。
    */
    "@babel/cli": "^7.4.3",
    /*
    看到`core`就知道它是`babel`的核心，一些转码操作都是基于它完成的,
    所以它是必须的依赖。
    */
    "@babel/core": "^7.4.3",
    /*
    对class中属性初始化语法、static语法等进行处理
    */
    "@babel/plugin-proposal-class-properties": "^7.4.0",
    /*
    ES7装饰器语法处理
    */
    "@babel/plugin-proposal-decorators": "^7.4.0",
    /*
    对象rest、spread语法处理
    */
    "@babel/plugin-proposal-object-rest-spread": "^7.4.3",
    /*
    import()语法处理
    */
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    /*
    Babel默认只转换新的JavaScript语法，但是不转换新的API，比如
    `Iterator`、`Generator`、`Set`、`Maps`、`Proxy`、`Reflect`、
    `Symbol`、`Promise` 等全局对象，以及一些定义在全局对象上的方法（比
    如 `Object.assign` ）都不会转码。而`@babel/polyfill`就可以做到。
    */
    "@babel/polyfill": "^7.4.3",
    /*
    根据指定环境来转码，这个不用说，必装
    */
    "@babel/preset-env": "^7.4.3",
    /*
    typescript的预设
    */
    "@babel/preset-typescript": "^7.3.3",
    /*
    让webpack.config.babel.js也支持ES6语法
    */
    "@babel/register": "^7.4.0",
    /*
    webpack里处理js、ts文件必须的loader
    */
    "babel-loader": "^8.0.5",
    /*
    动态polyfill
    */
    "core-js": "3",
    /*
    处理html的webpack插件
    */
    "html-webpack-plugin": "^3.2.0",
    /*
    对打包的js进行压缩处理的webapck插件
    */
    "terser-webpack-plugin": "^1.2.3",
    /*
    多进程处理打包，加快打包速度
    */
    "thread-loader": "^2.1.2",
    "typescript": "^3.4.5",
    "webpack": "^4.30.0",
    /*
    webpack命令行
    */
    "webpack-cli": "^3.3.1",
    "webpack-dev-server": "^3.3.1",
    /*
    webpack打包进度条
    */
    "webpackbar": "^3.2.0"
  }
```

##### 以上只介绍`ES6+typescript`环境的必需依赖，也是最最最重要的部分。但源码中也包含了对 html、less 的处理，如果你的项目需要其他依赖，比如：`样式、图片、字体`，请自行安装你想要的 loader 或插件

#### 项目使用

```
//安装依赖
npm install
//启动项目
npm run start
//在浏览器中打开：localhost:8080
```

#### 打包

```
npm run build
```
