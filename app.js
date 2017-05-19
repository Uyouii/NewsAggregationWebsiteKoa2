const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

// const index = require('./routes/index');
const users = require('./routes/users');

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


// routes
// app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

const homepage = require("./routes/homepage");
app.use(homepage.routes(),homepage.allowedMethods());

const news = require("./routes/news");
app.use(news.routes(),news.allowedMethods());

const newspage = require("./routes/newspage");
app.use(newspage.routes(),news.allowedMethods());

const getnewscontent = require("./routes/getnewscontent");
app.use(getnewscontent.routes(),getnewscontent.allowedMethods());

module.exports = app;
