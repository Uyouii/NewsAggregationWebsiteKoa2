const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');



// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'html'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// 各个路由的声明和定义
const index = require('./routes/index');
app.use(index.routes(), index.allowedMethods());

const news = require("./routes/news");
app.use(news.routes(),news.allowedMethods());

const getnewscontent = require("./routes/getnewscontent");
app.use(getnewscontent.routes(),getnewscontent.allowedMethods());

const users = require("./routes/users");
app.use(users.routes(),users.allowedMethods());


module.exports = app;
