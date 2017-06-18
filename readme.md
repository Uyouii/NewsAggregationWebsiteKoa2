# 新闻聚合网站

从各个新闻网站上将新闻爬取下来，整合到此网站上<br>

## 架构

__前端框架__ : bootstrap<br>
__服务器框架__ : node.js koa2<br>
__数据库__ : mongodb 

> 新闻爬取的项目在这：https://github.com/TaiyouDong/NewsSpider python3实现的爬虫程序。


## 运行

首先安装node.js和mongodb

### 网页端

进入NewsAggregationWebsiteKoa2工程目录，在cmd运行`npm install`命令安装项目运行需要的模块

在运行项目之前需要先运行新闻的爬取项目将新闻爬取到数据库中，新闻爬去的项目在：<https://github.com/TaiyouDong/NewsSpider>

每次运行服务器需要在NewsAggregationWebsiteKoa2目录下运行`npm start`命令打开服务器

随后在浏览器加载页面：localhost:3000/ 即可访问相应网站

### android端

android工程在NewsAggregrationApp下

由于网页端设置为了响应式，并且支持移动端设备，所以APP直接调用了一个webview显该网页

在运行前需要修改MainActivity.java中的打开网页的ip地址的路径，设置为相应的ip地址即可


