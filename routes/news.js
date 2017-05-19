/**
 * Created by 泰佑 on 2017/5/18.
 */

const router = require('koa-router')();
const db = require('./database');

router.prefix('/news');

router.post('/', async (ctx, next) => {
   const type = ctx.request.body.type || '';
   console.log(type);
   if( type != '') {
        ctx.body = await db.getTypeNews(type);
   }
   else ctx.body = "";
});


module.exports = router;
