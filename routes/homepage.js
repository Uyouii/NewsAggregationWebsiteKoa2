/**
 * Created by 泰佑 on 2017/5/17.
 */

const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('homepage')
});


module.exports = router;
