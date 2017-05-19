/**
 * Created by 泰佑 on 2017/5/19.
 */

const router = require('koa-router')();

router.get('/newspage', async (ctx, next) => {
    await ctx.render('newspage')
});


module.exports = router;