# Ecms

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## FileTree 目录结构
```shell
├── bin                       // node 命令行构建工具
├── build                      // 构建相关
├── config                     // 配置相关
├── src                        // 源代码
|    ├── assets                // 图片等静态资源
│   ├── api                    // 所有请求
│   ├── components             // 全局UI组件
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── utils                  // 全局公用方法
│   ├── containers              // 自适应布局组合
│   ├── view                   // view界面
│   │    ├── charts             //图表组件
│   │    ├── components         //首页组件
│   │    ├── login              //登录界面
│   │    ├── errorPages           //错误界面
│   │    └── permission        //权限测试界面
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 静态资源
│   ├── bower_components        //七牛SDK
│   ├── css                     //css
│   ├── js                      //js
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── index.html                 // html模板
└── package.json               // package.json

```
# upgrade
1.cnpm install -g npm-check-updates 或者 npm install -g npm-check-updates
2.在有package.json的目录执行 npm-check-updates或者 ncu简写命令检查是否有更新（该插件会去npm官网查询是否有最新版本）
3.然后执行ncu -u，检查package.json文件，会发现package.json里面的依赖版本号已经变成最新版本
4.然后cnpm install即可
