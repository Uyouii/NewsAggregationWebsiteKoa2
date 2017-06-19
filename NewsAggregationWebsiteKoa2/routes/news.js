/**
 * Created by 泰佑 on 2017/5/18.
 */

const router = require('koa-router')();
const db = require('./database');

router.prefix('/news');

router.post('/', async (ctx, next) => {
    const type = ctx.request.body.type || '';
    console.log(type);
    if( type !== '') {
        ctx.body = await db.getTypeNews(type);
    }
    else ctx.body = "";
});

router.post('/recommend', async (ctx, next) => {
    const email = ctx.request.body.email || '';

    if(email === '')
        ctx.body = await db.getTypeNews('即时');
    else {
        ctx.body = await db.getRecommendNews(email);
    }

});


module.exports = router;
