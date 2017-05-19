/**
 * Created by 泰佑 on 2017/5/19.
 */

const router = require('koa-router')();
const db = require('./database');

router.prefix('/getnewscontent');

router.post('/', async (ctx, next) => {
    const id = ctx.request.body.news_id || '';
    console.log(id);
    if( id != '') {
        ctx.body = await db.getNewsContent(id);
        //ctx.body = "haha";
    }
    else {
        ctx.body = "";
        console.log("id is null");
    }
});


module.exports = router;